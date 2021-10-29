
import {Classroom} from './Classroom';

export interface Grade {
  gradeId: number;
  gradeName: string;

  classrooms: Classroom[];
}
