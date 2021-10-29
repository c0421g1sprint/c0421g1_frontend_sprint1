import {ITeacher} from './ITeacher';
import {IStudent} from './IStudent';

import {Grade} from './Grade';
import {Schedule} from './Schedule';

export interface Classroom {
  classroomId: number;
  classroomName: string;
  classroomSchoolYear: string;
  deleteFlag: boolean;

  teacher: ITeacher;
  grade: Grade;
  students: IStudent[];
  schedule: Schedule[];

}
