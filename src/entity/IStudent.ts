import {IClassroom} from "./IClassroom";
import {IMark} from "./IMark";
import {IGrade} from "./IGrade";

export interface IStudent {
  // studentId: number;
  // studentName: string;
  // studentGender: number;
  // studentFatherName: string;
  // studentMotherName: string;
  // studentDateOfBirth: string;
  // studentEthnicity: string;
  // studentAddress: string;
  // studentImage: string;
  // studentStatus: string;
  // studentParentPhone: string;
  // deleteFlag: boolean;
  // studentReligion: string;
  // classroom: IClassroom;

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
  classGrade: IGrade;
}
