import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountverificationComponent } from './accountverification.component';

describe('AccountverificationComponent', () => {
  let component: AccountverificationComponent;
  let fixture: ComponentFixture<AccountverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountverificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
