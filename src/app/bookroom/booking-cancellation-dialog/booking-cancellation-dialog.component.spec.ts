import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCancellationDialogComponent } from './booking-cancellation-dialog.component';

describe('BookingCancellationDialogComponent', () => {
  let component: BookingCancellationDialogComponent;
  let fixture: ComponentFixture<BookingCancellationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingCancellationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingCancellationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
