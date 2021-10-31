import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomInputInforComponent } from './classroom-input-infor.component';

describe('ClassroomInputInforComponent', () => {
  let component: ClassroomInputInforComponent;
  let fixture: ComponentFixture<ClassroomInputInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomInputInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomInputInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
