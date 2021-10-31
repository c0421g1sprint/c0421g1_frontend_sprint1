import {ITeacher} from "./ITeacher";
import {IGrade} from "./IGrade";

export interface IClassroom {
  classroomId: number;
  classroomName: string;
  classroomSchoolYear: string;
  deleteFlag: boolean;
  teacher: ITeacher;
  grade: IGrade;
}
