import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteConfirmComponent } from './promote-confirm.component';

describe('PromoteConfirmComponent', () => {
  let component: PromoteConfirmComponent;
  let fixture: ComponentFixture<PromoteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
