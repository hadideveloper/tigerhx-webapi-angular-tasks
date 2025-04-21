import { Routes } from '@angular/router';
import { PrinterManagementComponent } from './printer-management/printer-management.component';
import { PrintActionsComponent } from './print-actions/print-actions.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'printers',
    component: PrinterManagementComponent,
    title: 'Printer Management'
  },
  {
    path: 'print',
    component: PrintActionsComponent,
    title: 'Print Documents'
  },
  { path: '', component: HomeComponent }
];
