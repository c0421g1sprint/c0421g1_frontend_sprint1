import {IClassroom} from "./IClassroom";

export interface IGrade {
  // gradeId: number;
  // gradeName: string;

  gradeId: number;
  gradeName: string;

  classGradeList: IClassroom;
}
