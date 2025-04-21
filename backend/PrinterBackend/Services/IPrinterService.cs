// Services/IPrinterService.cs
using PrinterBackend.Models;
using System.Net;

namespace PrinterBackend.Services
{
    public interface IPrinterService
    {
        // Printer Management
        Task<List<Printer>> GetPrinters();
        Task AddPrinter(Printer printer);
        Task DeletePrinter(int id);

        // Printing Functions
        Task PrintHelloWorld(string ipAddress);
        Task PrintInvoice(string ipAddress, InvoiceData invoice);
        Task PrintTestPage(string ipAddress);
        Task PrintRawData(string ipAddress, byte[] rawData);

        // Printer Status
        Task<PrinterStatus> CheckPrinterStatus(string ipAddress);

        // Utility
        Task<bool> IsPrinterOnline(string ipAddress);
    }

    public class PrinterStatus
    {
        public bool IsOnline { get; set; }
        public bool HasPaper { get; set; }
        public bool IsCoverOpen { get; set; }
        public string ErrorMessage { get; set; }
    }
}