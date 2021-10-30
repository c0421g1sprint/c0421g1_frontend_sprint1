import {IMark} from "./IMark";
import {IClassGrade} from "./IClassGrade";

export interface IStudent {
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

  markList: IMark[];
  classGrade: IClassGrade;
}
