import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentByTeacherComponent } from './list-student-by-teacher.component';

describe('ListStudentByTeacherComponent', () => {
  let component: ListStudentByTeacherComponent;
  let fixture: ComponentFixture<ListStudentByTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentByTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
