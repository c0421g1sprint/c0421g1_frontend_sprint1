import {IClassGrade} from "./IClassGrade";

export interface IGrade {
  gradeId: number;
  gradeName: string;

  classGradeList: IClassGrade[];
}
