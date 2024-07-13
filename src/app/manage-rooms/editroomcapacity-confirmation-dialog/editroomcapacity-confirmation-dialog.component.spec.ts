import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomcapacityConfirmationDialogComponent } from './editroomcapacity-confirmation-dialog.component';

describe('EditroomcapacityConfirmationDialogComponent', () => {
  let component: EditroomcapacityConfirmationDialogComponent;
  let fixture: ComponentFixture<EditroomcapacityConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroomcapacityConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditroomcapacityConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
