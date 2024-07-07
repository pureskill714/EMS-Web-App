import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingroominfoComponent } from './meetingroominfo.component';

describe('MeetingroominfoComponent', () => {
  let component: MeetingroominfoComponent;
  let fixture: ComponentFixture<MeetingroominfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingroominfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingroominfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
