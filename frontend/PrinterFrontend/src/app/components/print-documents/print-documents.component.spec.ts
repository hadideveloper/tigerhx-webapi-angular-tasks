import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDocumentsComponent } from './print-documents.component';

describe('PrintDocumentsComponent', () => {
  let component: PrintDocumentsComponent;
  let fixture: ComponentFixture<PrintDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
