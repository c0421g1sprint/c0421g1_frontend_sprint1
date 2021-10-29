import {IClassGrade} from "./IClassGrade";
import {ISchedule} from "./ISchedule";
import {ISubject} from "./ISubject";
import {IStudyDayTime} from "./IStudyDayTime";

export interface IScheduleDetail {
  scheduleDetailId: number;

  subject: ISubject;
  studyDayTime: IStudyDayTime;
  classGrade: IClassGrade;
  schedule: ISchedule;
}
