import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailInListComponent } from './student-detail-in-list.component';

describe('StudentDetailInListComponent', () => {
  let component: StudentDetailInListComponent;
  let fixture: ComponentFixture<StudentDetailInListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDetailInListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
