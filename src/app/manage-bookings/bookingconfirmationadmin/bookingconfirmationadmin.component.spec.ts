import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingconfirmationadminComponent } from './bookingconfirmationadmin.component';

describe('BookingconfirmationadminComponent', () => {
  let component: BookingconfirmationadminComponent;
  let fixture: ComponentFixture<BookingconfirmationadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingconfirmationadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingconfirmationadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
