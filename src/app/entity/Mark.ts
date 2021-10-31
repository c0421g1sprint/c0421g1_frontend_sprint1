import {Subject} from './Subject';
import {Student} from './Student';


export interface Mark {
  markId: number;
  markPointNumber1: number;
  markPointNumber2: number;
  markPointNumber3: number;

  student: Student;
  subject: Subject;
}
