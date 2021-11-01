import { TestBed } from '@angular/core/testing';

import { ScheduleTeacherService } from './schedule-teacher.service';

describe('ScheduleTeacherService', () => {
  let service: ScheduleTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
