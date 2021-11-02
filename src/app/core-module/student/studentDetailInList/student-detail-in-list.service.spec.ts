import { TestBed } from '@angular/core/testing';

import { StudentDetailInListService } from './student-detail-in-list.service';

describe('StudentDetailInListService', () => {
  let service: StudentDetailInListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDetailInListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
