using PrinterBackend.Data;
using PrinterBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Net.Sockets;
using System.Text;
using System.Net;

namespace PrinterBackend.Services
{
    public class PrinterService : IPrinterService
    {
        private const int PrinterPort = 9100;
        private const int TimeoutMs = 5000;
        private readonly PrinterDbContext _context;
        private readonly ILogger<PrinterService> _logger;

        public PrinterService(
            PrinterDbContext context,
            ILogger<PrinterService> logger)
        {
            _context = context;
            _logger = logger;
        }

        #region Printer Management
        public async Task<List<Printer>> GetPrinters() =>
            await _context.Printers.ToListAsync();

        public async Task AddPrinter(Printer printer)
        {
            if (await _context.Printers.AnyAsync(p => p.IpAddress == printer.IpAddress))
                throw new InvalidOperationException("Printer with this IP already exists");

            _context.Printers.Add(printer);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePrinter(int id)
        {
            var printer = await _context.Printers.FindAsync(id);
            if (printer == null) return;

            _context.Printers.Remove(printer);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region Printing Functions
        public async Task PrintHelloWorld(string ipAddress)
        {
            var commands = new List<byte>
            {
                0x1B, 0x40, // Initialize printer
                0x1B, 0x74, 0x11, // Character set UTF-8
                0x1D, 0x21, 0x11, // Double height/width
                0x1B, 0x61, 0x01, // Center alignment
                0x0A // Line feed
            };

            commands.AddRange(Encoding.UTF8.GetBytes("HELLO WORLD\n"));
            commands.AddRange(new byte[] { 0x1B, 0x69 }); // Full cut

            await SendToPrinter(ipAddress, commands);
        }

        public async Task PrintInvoice(string ipAddress, InvoiceData invoice)
        {
            if (invoice == null) throw new ArgumentNullException(nameof(invoice));

            var builder = new List<byte>
            {
                0x1B, 0x40, // Initialize
                0x1B, 0x74, 0x11, // UTF-8
                0x1B, 0x61, 0x01, // Center
                0x1D, 0x21, 0x11 // Double size
            };

            // Header
            builder.AddRange(Encoding.UTF8.GetBytes("INVOICE\n"));
            builder.AddRange(Encoding.UTF8.GetBytes($"#: {invoice.InvoiceNumber}\n"));
            builder.AddRange(Encoding.UTF8.GetBytes($"Date: {invoice.Date}\n\n"));

            // Products
            foreach (var product in invoice.Products)
            {
                builder.AddRange(Encoding.UTF8.GetBytes(
                    $"{product.Name} x{product.Quantity} @ {product.Price}\n"));
            }

            // Total
            builder.AddRange(new byte[] { 0x1B, 0x61, 0x02 }); // Right align
            builder.AddRange(Encoding.UTF8.GetBytes($"\nTOTAL: {invoice.TotalAmount}\n\n"));

            // Footer
            builder.AddRange(new byte[] { 0x1B, 0x69 }); // Full cut

            await SendToPrinter(ipAddress, builder);
        }

        public async Task PrintTestPage(string ipAddress) =>
            await PrintHelloWorld(ipAddress);

        public async Task PrintRawData(string ipAddress, byte[] rawData) =>
            await SendToPrinter(ipAddress, rawData);
        #endregion

        #region Printer Status
        public async Task<PrinterStatus> CheckPrinterStatus(string ipAddress)
        {
            var status = new PrinterStatus();

            try
            {
                using var socket = new Socket(AddressFamily.InterNetwork,
                                            SocketType.Stream,
                                            ProtocolType.Tcp);

                // Check connection
                var connectTask = socket.ConnectAsync(IPAddress.Parse(ipAddress), PrinterPort);
                if (await Task.WhenAny(connectTask, Task.Delay(1000)) != connectTask)
                {
                    status.ErrorMessage = "Connection timeout";
                    return status;
                }

                status.IsOnline = socket.Connected;

                // Advanced status checks can be added here
                // (paper status, cover status, etc.)
            }
            catch (Exception ex)
            {
                status.ErrorMessage = ex.Message;
                _logger.LogError(ex, "Printer status check failed");
            }

            return status;
        }

        public async Task<bool> IsPrinterOnline(string ipAddress)
        {
            try
            {
                using var socket = new Socket(AddressFamily.InterNetwork,
                                            SocketType.Stream,
                                            ProtocolType.Tcp);

                var connectTask = socket.ConnectAsync(IPAddress.Parse(ipAddress), PrinterPort);
                await Task.WhenAny(connectTask, Task.Delay(1000));
                return socket.Connected;
            }
            catch
            {
                return false;
            }
        }
        #endregion

        #region Private Methods
        private async Task SendToPrinter(string ipAddress, IEnumerable<byte> commands)
        {
            if (!IPAddress.TryParse(ipAddress, out _))
                throw new ArgumentException("Invalid IP address format");

            using var socket = new Socket(AddressFamily.InterNetwork,
                                        SocketType.Stream,
                                        ProtocolType.Tcp)
            {
                SendTimeout = TimeoutMs,
                ReceiveTimeout = TimeoutMs
            };

            try
            {
                // Connect with timeout
                var connectTask = socket.ConnectAsync(IPAddress.Parse(ipAddress), PrinterPort);
                if (await Task.WhenAny(connectTask, Task.Delay(TimeoutMs)) != connectTask)
                {
                    throw new TimeoutException("Printer connection timeout");
                }

                // Send data
                await socket.SendAsync(commands.ToArray(), SocketFlags.None);
                await Task.Delay(200); // Processing delay

                _logger.LogInformation("Data sent to printer {IpAddress}", ipAddress);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending to printer {IpAddress}", ipAddress);
                throw new ApplicationException($"Print failed: {ex.Message}", ex);
            }
            finally
            {
                socket.Shutdown(SocketShutdown.Both);
            }
        }
        #endregion
    }
}