// Models/InvoiceData.cs
namespace PrinterBackend.Models
{
    public class InvoiceData
    {
        public required string InvoiceNumber { get; set; }
        public required string Date { get; set; }
        public required string CustomerName { get; set; }
        public required List<Product> Products { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Notes { get; set; }
    }

    public class Product
    {
        public required string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
