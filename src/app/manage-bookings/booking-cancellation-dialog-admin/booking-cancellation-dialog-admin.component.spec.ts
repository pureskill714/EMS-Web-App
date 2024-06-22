import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCancellationDialogAdminComponent } from './booking-cancellation-dialog-admin.component';

describe('BookingCancellationDialogAdminComponent', () => {
  let component: BookingCancellationDialogAdminComponent;
  let fixture: ComponentFixture<BookingCancellationDialogAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingCancellationDialogAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingCancellationDialogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
