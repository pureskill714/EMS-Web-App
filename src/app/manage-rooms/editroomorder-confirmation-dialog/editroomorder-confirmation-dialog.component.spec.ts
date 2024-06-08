import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomorderConfirmationDialogComponent } from './editroomorder-confirmation-dialog.component';

describe('EditroomorderConfirmationDialogComponent', () => {
  let component: EditroomorderConfirmationDialogComponent;
  let fixture: ComponentFixture<EditroomorderConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroomorderConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditroomorderConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
