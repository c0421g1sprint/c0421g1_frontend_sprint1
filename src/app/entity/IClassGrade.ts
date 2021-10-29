import {ITeacher} from './ITeacher';
import {IStudent} from './IStudent';
import {IGrade} from './IGrade';
import {ISchedule} from './ISchedule';
import {IScheduleDetail} from './IScheduleDetail';

export interface IClassGrade {
  classGradeId: number;
  classGradeName: string;
  classGradeSchoolYear: string;
  deleteFlag: boolean;

  teacher: ITeacher;
  grade: IGrade;
  studentList: IStudent[];
  scheduleList: ISchedule[];
  scheduleDetailList: IScheduleDetail[];
}
