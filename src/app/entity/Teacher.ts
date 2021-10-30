
import {Account} from './Account';
import {Degree} from './Degree';
import {Division} from './Division';
import {Classroom} from './Classroom';

export interface Teacher {
  teacherId: number;
  teacherName: string;
  teacherGender: number;
  teacherDateOfBirth: string;
  teacherUniversity: string;
  teacherAddress: string;
  teacherEmail: string;
  teacherPhone: string;
  teacherImage: string;
  deleteFlag: boolean;

  account: Account;
  degree: Degree;
  division: Division;
  classroom: Classroom[];

}
