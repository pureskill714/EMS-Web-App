import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteraccountconfirmationComponent } from './registeraccountconfirmation.component';

describe('RegisteraccountconfirmationComponent', () => {
  let component: RegisteraccountconfirmationComponent;
  let fixture: ComponentFixture<RegisteraccountconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteraccountconfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteraccountconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
