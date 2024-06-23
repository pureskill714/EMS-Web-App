import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroomconfirmationComponent } from './addroomconfirmation.component';

describe('AddroomconfirmationComponent', () => {
  let component: AddroomconfirmationComponent;
  let fixture: ComponentFixture<AddroomconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddroomconfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddroomconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
