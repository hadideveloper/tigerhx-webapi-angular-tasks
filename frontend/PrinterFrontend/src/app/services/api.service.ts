//api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Printer } from '../models/printer.model';
import { InvoiceData } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:5227/api/printer';

  constructor(private http: HttpClient) { }

  // Printer Management
  getPrinters(): Observable<Printer[]> {
    return this.http.get<Printer[]>(`${this.API_URL}/printers`);
  }

  addPrinter(printerData: Omit<Printer, 'id'>): Observable<Printer> {
    return this.http.post<Printer>(`${this.API_URL}/printers`, printerData);
  }

  deletePrinter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/printers/${id}`);
  }

  // Printing Functions
  printHelloWorld(ipAddress: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/print/hello`, { ipAddress });
  }

  printInvoice(ipAddress: string, invoice: InvoiceData): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/print/invoice`, {
      ipAddress,
      invoice: {
        InvoiceNumber: invoice.invoiceNumber,
        Date: invoice.date,
        CustomerName: invoice.customerName,
        Products: invoice.products,
        TotalAmount: invoice.totalAmount,
        Notes: invoice.notes
      }
    });
  }
}
