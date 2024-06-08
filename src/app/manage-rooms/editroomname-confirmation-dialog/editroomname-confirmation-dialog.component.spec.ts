import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomnameConfirmationDialogComponent } from './editroomname-confirmation-dialog.component';

describe('EditroomnameConfirmationDialogComponent', () => {
  let component: EditroomnameConfirmationDialogComponent;
  let fixture: ComponentFixture<EditroomnameConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroomnameConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditroomnameConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
