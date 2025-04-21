import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  template: `
    <div class="container text-center mt-5">
      <h1 class="mb-4">Printer Control System</h1>
      <div class="d-grid gap-3 col-md-6 mx-auto">
        <button (click)="navigateToPrinters()" class="btn btn-primary btn-lg py-3">
          <i class="bi bi-printer-fill me-2"></i> Printer Management
        </button>
        <button (click)="navigateToPrint()" class="btn btn-success btn-lg py-3">
          <i class="bi bi-send-fill me-2"></i> Print Documents
        </button>
      </div>
    </div>
  `,
  styles: [`
    .btn {
      transition: all 0.2s;
      cursor: pointer;
    }
    .btn:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) { }

  navigateToPrinters() {
    this.router.navigate(['/printers']);
  }

  navigateToPrint() {
    this.router.navigate(['/print']);
  }
}
