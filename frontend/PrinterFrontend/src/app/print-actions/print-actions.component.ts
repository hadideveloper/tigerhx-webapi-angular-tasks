//print-actions.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { InvoiceData, Product } from '../models/invoice.model';
import {
  DxSelectBoxModule,
  DxFormModule,
  DxButtonModule,
  DxDataGridModule,
  DxNumberBoxModule,
  DxDateBoxModule,
  DxTextAreaModule,
  DxToastModule,
  DxValidatorModule

} from 'devextreme-angular';

@Component({
  selector: 'app-print-actions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DxSelectBoxModule,
    DxFormModule,
    DxButtonModule,
    DxDataGridModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxToastModule,
    DxValidatorModule
  ],
  templateUrl: './print-actions.component.html',
  styles: [`
    .dx-card {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .dx-form {
      padding: 15px 0;
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
    totalAmount: 0,
    notes: undefined
  };
  isPrinting: boolean = false;
  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  productsGridOptions = {
    dataSource: this.invoiceData.products,
    columns: [
      {
        dataField: 'name',
        caption: 'Product Name',
        validationRules: [{ type: 'required' }]
      },
      {
        dataField: 'quantity',
        caption: 'Qty',
        dataType: 'number',
        editorOptions: { min: 1 }
      },
      {
        dataField: 'price',
        caption: 'Price',
        dataType: 'number',
        format: 'currency',
        editorOptions: { min: 0, step: 0.01 }
      }
    ],
    editing: {
      allowAdding: true,
      allowDeleting: true,
      mode: 'row'
    },
    onRowInserted: () => this.calculateTotal(),
    onRowUpdated: () => this.calculateTotal(),
    onRowRemoved: () => this.calculateTotal()
  };

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
        }
      },
      error: (err: any) => this.showToast('Error loading printers', 'error')
    });
  }

  calculateTotal(): void {
    this.invoiceData.totalAmount = this.invoiceData.products.reduce(
      (sum, product) => sum + (product.price * product.quantity), 0);
  }

  validateForm(): boolean {
    return !!this.selectedPrinterIp &&
      !!this.invoiceData.invoiceNumber &&
      !!this.invoiceData.customerName &&
      this.invoiceData.products.every(p => !!p.name && p.price > 0);
  }

  print(): void {
    this.selectedPrinterIp = this.selectedPrinterIp.trim();
    if (!this.validateForm()) {
      this.showToast('Please fill all required fields!', 'error');
      return;
    }

    this.isPrinting = true;
    this.calculateTotal();

    this.apiService.printInvoice(this.selectedPrinterIp, this.invoiceData).subscribe({
      next: () => {
        this.showToast('Invoice sent successfully!', 'success');
        this.isPrinting = false;
      },
      error: (err: any) => {
        this.showToast(`Error: ${err.message || err}`, 'error');
        this.isPrinting = false;
      }
    });
  }

  printHelloWorld(): void {
    this.selectedPrinterIp = this.selectedPrinterIp.trim();
    if (!this.selectedPrinterIp) {
      this.showToast('Please select a printer first!', 'error');
      return;
    }

    this.isPrinting = true;
    this.apiService.printHelloWorld(this.selectedPrinterIp).subscribe({
      next: () => {
        this.showToast('Test page sent to printer!', 'success');
        this.isPrinting = false;
      },
      error: (err: any) => {
        this.showToast(`Error: ${err.message || err}`, 'error');
        this.isPrinting = false;
      }
    });
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
  }
}
