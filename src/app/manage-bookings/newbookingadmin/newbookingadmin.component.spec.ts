import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbookingadminComponent } from './newbookingadmin.component';

describe('NewbookingadminComponent', () => {
  let component: NewbookingadminComponent;
  let fixture: ComponentFixture<NewbookingadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewbookingadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewbookingadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
