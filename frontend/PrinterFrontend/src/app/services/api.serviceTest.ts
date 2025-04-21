import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Printer } from '../models/printer.model';
import { InvoiceData } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:5227/api/printer';

  constructor(private http: HttpClient) { }

  // Printer Management
  addPrinter(printerData: { printerName: string, ipAddress: string }): Observable<Printer> {
    return this.http.post<Printer>(
      `${this.API_URL}/printers`,
      printerData
    ).pipe(
      catchError(this.handleError)
    );
  }

  getPrinters(): Observable<Printer[]> {
    return this.http.get<Printer[]>(`${this.API_URL}/printers`).pipe(
      catchError(this.handleError)
    );
  }

  deletePrinter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/printers/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Printer Status
  checkPrinterStatus(ipAddress: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.API_URL}/status`,
      { params: { ip: ipAddress } }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Printing Functions
  printTestPage(ipAddress: string): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/print/hello`,
      { ipAddress }
    ).pipe(
      catchError(this.handleError)
    );
  }

  printInvoice(ipAddress: string, invoice: InvoiceData): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/print/invoice`,
      { ipAddress, invoice }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Error Handling
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw error.error?.message || 'Server error occurred';
  }
}
