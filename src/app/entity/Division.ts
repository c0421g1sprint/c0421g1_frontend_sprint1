import {Teacher} from "./Teacher";

export interface Division {
  divisionId: number;
  divisionName: string;

  teacherList: Teacher[];
}
