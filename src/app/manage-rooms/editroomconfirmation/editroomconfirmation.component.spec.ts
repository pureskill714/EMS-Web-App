import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomconfirmationComponent } from './editroomconfirmation.component';

describe('EditroomconfirmationComponent', () => {
  let component: EditroomconfirmationComponent;
  let fixture: ComponentFixture<EditroomconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroomconfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditroomconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
