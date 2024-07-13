import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomlocationConfirmationDialogComponent } from './editroomlocation-confirmation-dialog.component';

describe('EditroomlocationConfirmationDialogComponent', () => {
  let component: EditroomlocationConfirmationDialogComponent;
  let fixture: ComponentFixture<EditroomlocationConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroomlocationConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditroomlocationConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
