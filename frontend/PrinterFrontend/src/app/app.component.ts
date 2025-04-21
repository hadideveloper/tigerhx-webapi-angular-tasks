import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DxDataGridModule, DxButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PrinterFrontend';
}
