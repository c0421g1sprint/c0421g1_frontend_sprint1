import {ITeacher} from "./ITeacher";

export interface IDivision {
  divisionId: number;
  divisionName: string;

  teacherList: ITeacher[];
}
