//printer-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrinterListComponent } from '../components/printer-list/printer-list.component';
import { AddPrinterComponent } from '../components/add-printer/add-printer.component';
import { ApiService } from '../services/api.service';
import { Printer } from '../models/printer.model';

@Component({
  selector: 'app-printer-management',
  standalone: true,
  imports: [CommonModule, PrinterListComponent, AddPrinterComponent],
  templateUrl: './printer-management.component.html',
  styleUrls: ['./printer-management.component.css']
})
export class PrinterManagementComponent implements OnInit {
  showModal = false;
  printers: Printer[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPrinters();
  }

  loadPrinters(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getPrinters().subscribe({
      next: (data) => {
        this.printers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load printers';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openAddPrinterModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onPrinterAdded(): void {
    this.closeModal();
    this.loadPrinters();
  }
}
