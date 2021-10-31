import {IAccount} from "./IAccount";
import {IDegree} from "./IDegree";
import {IDivision} from "./IDivision";
import {IClassroom} from "./IClassroom";

export interface ITeacher {
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
  account: IAccount;
  teacherDegree: IDegree;
  teacherDivision: IDivision;
  classroomList: IClassroom[];
}
