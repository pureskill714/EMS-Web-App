import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomcapacityconfirmationComponent } from './editroomcapacityconfirmation.component';

describe('EditroomcapacityconfirmationComponent', () => {
  let component: EditroomcapacityconfirmationComponent;
  let fixture: ComponentFixture<EditroomcapacityconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroomcapacityconfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditroomcapacityconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
