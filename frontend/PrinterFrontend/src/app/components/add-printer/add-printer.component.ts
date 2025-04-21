import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DxPopupModule, DxFormModule, DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-add-printer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DxPopupModule,
    DxFormModule,
    DxButtonModule
  ],
  templateUrl: './add-printer.component.html',
  styleUrls: ['./add-printer.component.css']
})
export class AddPrinterComponent implements OnChanges {
  @Output() printerAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() visible: boolean = false;

  addForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.addForm = this.fb.group({
      printerName: ['', [Validators.required, Validators.maxLength(50)]],
      ip: ['', [
        Validators.required,
        Validators.pattern(this.ipPattern)
      ]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && !changes['visible'].firstChange) {
    }
  }

  get printerName(): AbstractControl | null {
    return this.addForm.get('printerName');
  }

  get ip(): AbstractControl | null {
    return this.addForm.get('ip');
  }

  onSubmit(): void {
    if (this.addForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.error = null;

    const printerData = {
      printerName: this.printerName?.value?.trim(),
      ipAddress: this.ip?.value
    };

    this.apiService.addPrinter(printerData).subscribe({
      next: () => {
        this.handleSuccess();
      },
      error: (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    });
  }

  onCancel(): void {
    this.addForm.reset();
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  private handleSuccess(): void {
    this.addForm.reset();
    this.isSubmitting = false;
    this.printerAdded.emit();
    this.visibleChange.emit(false); 
  }

  private handleError(err: HttpErrorResponse): void {
    this.isSubmitting = false;
    this.error = err.status === 400
      ? 'Invalid printer data. Please check the fields and try again.'
      : 'Server error. Please try again later.';
    console.error('Printer addition failed:', err);
    setTimeout(() => this.error = null, 5000);
  }
}
