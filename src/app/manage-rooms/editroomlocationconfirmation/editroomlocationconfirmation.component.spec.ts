import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroomlocationconfirmationComponent } from './editroomlocationconfirmation.component';

describe('EditroomlocationconfirmationComponent', () => {
  let component: EditroomlocationconfirmationComponent;
  let fixture: ComponentFixture<EditroomlocationconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroomlocationconfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditroomlocationconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
