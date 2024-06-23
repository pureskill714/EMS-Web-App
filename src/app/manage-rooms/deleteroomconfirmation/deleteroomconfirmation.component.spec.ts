import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteroomconfirmationComponent } from './deleteroomconfirmation.component';

describe('DeleteroomconfirmationComponent', () => {
  let component: DeleteroomconfirmationComponent;
  let fixture: ComponentFixture<DeleteroomconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteroomconfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteroomconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
