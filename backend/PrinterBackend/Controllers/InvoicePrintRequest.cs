namespace PrinterBackend.Models
{
    public class InvoicePrintRequest
    {
        public string IpAddress { get; set; }
        public InvoiceData Invoice { get; set; }
    }
}