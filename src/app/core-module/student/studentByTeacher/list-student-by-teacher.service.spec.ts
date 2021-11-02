import { TestBed } from '@angular/core/testing';

import { ListStudentByTeacherService } from './list-student-by-teacher.service';

describe('ListStudentByTeacherService', () => {
  let service: ListStudentByTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListStudentByTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
