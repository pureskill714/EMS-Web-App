import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroomConfirmationDialogComponent } from './addroom-confirmation-dialog.component';

describe('AddroomConfirmationDialogComponent', () => {
  let component: AddroomConfirmationDialogComponent;
  let fixture: ComponentFixture<AddroomConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddroomConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddroomConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
