import {ITeacher} from "./ITeacher";

export interface IDegree {
  degreeId: number;
  degreeName: string;

  teacherList: ITeacher[];
}
