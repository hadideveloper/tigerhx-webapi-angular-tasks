using Microsoft.AspNetCore.Mvc;
using PrinterBackend.Services;
using PrinterBackend.Models;
using PrinterBackend.Data; // Добавлено для PrinterDbContext
using System.ComponentModel.DataAnnotations; // Добавлено для атрибутов валидации

namespace PrinterBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrinterController : ControllerBase
    {
        private readonly IPrinterService _printerService;

        public PrinterController(IPrinterService printerService)
        {
            _printerService = printerService;
        }

        [HttpGet("printers")]
        public async Task<IActionResult> GetPrinters()
        {
            var printers = await _printerService.GetPrinters();
            return Ok(printers);
        }

        [HttpPost("printers")]
        public async Task<IActionResult> AddPrinter([FromBody] Printer printer)
        {
            await _printerService.AddPrinter(printer);
            return Ok();
        }

        [HttpDelete("printers/{id}")]
        public async Task<IActionResult> DeletePrinter(int id)
        {
            await _printerService.DeletePrinter(id);
            return NoContent();
        }

        [HttpPost("print/hello")]
        public async Task<IActionResult> PrintHello([FromBody] PrintRequest request)
        {
            await _printerService.PrintHelloWorld(request.IpAddress);
            return Ok();
        }

        [HttpPost("print/invoice")]
        public async Task<IActionResult> PrintInvoice([FromBody] InvoicePrintRequest request)
        {
            await _printerService.PrintInvoice(request.IpAddress, request.Invoice);
            return Ok();
        }

        [HttpPost("print/raw")]
        public async Task<IActionResult> PrintRaw([FromBody] RawPrintRequest request)
        {
            await _printerService.PrintRawData(request.IpAddress, request.Data);
            return Ok();
        }

        [HttpGet("status")]
        public async Task<IActionResult> CheckPrinterStatus([FromQuery] string ip)
        {
            var status = await _printerService.CheckPrinterStatus(ip);
            return Ok(status);
        }
    }

    // Новые DTO модели
    public class RawPrintRequest
    {
        public string IpAddress { get; set; }
        public byte[] Data { get; set; }
    }
}