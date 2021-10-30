import {Teacher} from './Teacher';
import {Schedule} from './Schedule';
import {Grade} from './Grade';
import {Student} from './Student';


export interface Classroom {
  classroomId: number;
  classroomName: string;
  classroomSchoolYear: string;
  deleteFlag: boolean;

  teacher: Teacher;
  grade: Grade;
  students: Student[];
  schedule: Schedule[];


}
