using Microsoft.EntityFrameworkCore;
using PrinterBackend.Models;

namespace PrinterBackend.Data
{
    public class PrinterDbContext : DbContext
    {
        public PrinterDbContext(DbContextOptions<PrinterDbContext> options)
            : base(options) { }

        public DbSet<Printer> Printers { get; set; }
    }
}