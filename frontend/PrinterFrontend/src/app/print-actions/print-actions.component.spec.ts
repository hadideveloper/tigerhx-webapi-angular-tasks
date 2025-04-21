import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintActionsComponent } from './print-actions.component';

describe('PrintActionsComponent', () => {
  let component: PrintActionsComponent;
  let fixture: ComponentFixture<PrintActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
