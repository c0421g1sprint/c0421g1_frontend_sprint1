import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmCreateComponent } from './dialog-confirm-create.component';

describe('DialogConfirmCreateComponent', () => {
  let component: DialogConfirmCreateComponent;
  let fixture: ComponentFixture<DialogConfirmCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
