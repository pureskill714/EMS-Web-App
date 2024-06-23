import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteroomConfirmationDialogComponent } from './deleteroom-confirmation-dialog.component';

describe('DeleteroomConfirmationDialogComponent', () => {
  let component: DeleteroomConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteroomConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteroomConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteroomConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
