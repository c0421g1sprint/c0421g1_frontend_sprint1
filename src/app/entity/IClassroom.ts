import {ITeacher} from "./ITeacher";
import {IGrade} from "./IGrade";
import {IStudent} from "./IStudent";
import {ISchedule} from "./ISchedule";

export interface IClassroom {
  // classroomId: number;
  // classroomName: string;
  // classroomSchoolYear: string;
  // deleteFlag: boolean;
  // teacher: ITeacher;
  // grade: IGrade;

  classroomId: number;
  classroomName: string;
  classroomSchoolYear: string;
  deleteFlag: boolean;

  teacher: ITeacher;
  grade: IGrade;
  students: IStudent[];
  schedule: ISchedule[];
}
