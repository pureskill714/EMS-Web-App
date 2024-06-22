import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelbookingconfirmationadminComponent } from './cancelbookingconfirmationadmin.component';

describe('CancelbookingconfirmationadminComponent', () => {
  let component: CancelbookingconfirmationadminComponent;
  let fixture: ComponentFixture<CancelbookingconfirmationadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelbookingconfirmationadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelbookingconfirmationadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
