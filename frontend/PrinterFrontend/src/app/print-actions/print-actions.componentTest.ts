import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { InvoiceData, Product } from '../models/invoice.model';

@Component({
  selector: 'app-print-actions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './print-actions.component.html',
  styles: [`
    .card {
      max-width: 800px;
      margin: 0 auto;
    }
    .form-control {
      margin-bottom: 10px;
    }
    .product-row {
      margin-bottom: 10px;
    }
  `]
})
export class PrintActionsComponent implements OnInit {
  printers: { printerName: string, ipAddress: string }[] = [];
  selectedPrinterIp: string = '';
  invoiceData: InvoiceData = {
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    products: [{ name: '', quantity: 1, price: 0 }],
    totalAmount: 0
  };
  printerStatus: string = 'unknown';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadPrinters();
  }

  loadPrinters(): void {
    this.apiService.getPrinters().subscribe({
      next: (printers) => {
        this.printers = printers;
        if (printers.length > 0) {
          this.selectedPrinterIp = printers[0].ipAddress;
          this.checkPrinterStatus();
        }
      },
      error: (err) => console.error('Error loading printers:', err)
    });
  }

  checkPrinterStatus(): void {
    if (!this.selectedPrinterIp) return;

    this.apiService.checkPrinterStatus(this.selectedPrinterIp).subscribe({
      next: (isOnline) => {
        this.printerStatus = isOnline ? 'online' : 'offline';
      },
      error: () => this.printerStatus = 'error'
    });
  }

  addProduct(): void {
    this.invoiceData.products.push({ name: '', quantity: 1, price: 0 });
  }

  removeProduct(index: number): void {
    if (this.invoiceData.products.length > 1) {
      this.invoiceData.products.splice(index, 1);
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.invoiceData.totalAmount = this.invoiceData.products.reduce(
      (sum, product) => sum + (product.price * product.quantity), 0);
  }

  print(): void {
    if (!this.selectedPrinterIp) {
      alert('Please select a printer!');
      return;
    }

    this.calculateTotal();

    this.apiService.printInvoice(this.selectedPrinterIp, this.invoiceData).subscribe({
      next: () => alert('Invoice sent to printer successfully!'),
      error: (err) => alert(`Print failed: ${err}`)
    });
  }

  printTestPage(): void {
    this.apiService.printTestPage(this.selectedPrinterIp).subscribe({
      next: () => alert('Test page sent to printer!'),
      error: (err) => alert(`Error: ${err}`)
    });
  }
}
