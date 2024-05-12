import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonverifiedaccountmessageComponent } from './nonverifiedaccountmessage.component';

describe('NonverifiedaccountmessageComponent', () => {
  let component: NonverifiedaccountmessageComponent;
  let fixture: ComponentFixture<NonverifiedaccountmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonverifiedaccountmessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonverifiedaccountmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
