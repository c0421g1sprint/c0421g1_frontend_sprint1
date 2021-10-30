import {IMark} from './IMark';
import {IClassGrade} from './IClassGrade';
import {Classroom} from './Classroom';
import {Mark} from './Mark';

export interface Student {
  studentId: number;
  studentName: string;
  studentGender: number;
  studentFatherName: string;
  studentMotherName: string;
  studentDateOfBirth: string;
  studentEthnicity: string;
  studentAddress: string;
  studentImage: string;
  studentStatus: string;
  studentParentPhone: string;
  deleteFlag: boolean;

  marks: Mark[];
  classroom: Classroom[];
}
