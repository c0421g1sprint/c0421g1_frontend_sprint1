import {Teacher} from "./Teacher";

export interface Degree {
  degreeId: number;
  degreeName: string;
  teacherList: Teacher[];

}
