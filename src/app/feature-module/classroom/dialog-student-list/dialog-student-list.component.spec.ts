import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStudentListComponent } from './dialog-student-list.component';

describe('DialogStudentListComponent', () => {
  let component: DialogStudentListComponent;
  let fixture: ComponentFixture<DialogStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
