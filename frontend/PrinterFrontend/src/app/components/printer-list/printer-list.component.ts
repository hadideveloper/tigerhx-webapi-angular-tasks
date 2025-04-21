import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Printer } from '../../models/printer.model';
import { ApiService } from '../../services/api.service';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { AddPrinterComponent } from '../add-printer/add-printer.component';

@Component({
  selector: 'app-printer-list',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxButtonModule, AddPrinterComponent],
  templateUrl: './printer-list.component.html',
  styleUrls: ['./printer-list.component.css']
})
export class PrinterListComponent {
  @Input() printers: Printer[] = [];
  @Input() isLoading = false;
  @Input() error: string | null = null;

  visible = false;

  // Val IP
  public ipValidationRules = [
    { type: 'required' },
    { type: 'pattern', pattern: /^(\d{1,3}\.){3}\d{1,3}$/, message: 'Invalid IP format' }
  ];

  constructor(private apiService: ApiService) { }

  openAddModal(): void {
    this.visible = true; 
  }

  closeModal(): void {
    this.visible = false; 
  }

  onPrinterAdded(): void {
    this.loadPrinters();
    this.closeModal(); 
  }

  loadPrinters(): void {
    this.apiService.getPrinters().subscribe({
      next: (printers) => {
        this.printers = printers;
      },
      error: (err) => {
        console.error('Failed to load printers:', err);
      }
    });
  }

  deletePrinter = (e: { row?: { data: Printer } }) => {
    const rowData = e.row?.data;
    if (!rowData?.id) return;

    if (confirm(`Удалить "${rowData.printerName}"?`)) {
      this.apiService.deletePrinter(rowData.id).subscribe({
        next: () => {
          this.printers = this.printers.filter(p => p.id !== rowData.id);
        },
        error: (err) => console.error('Delete error:', err)
      });
    }
  };
}

