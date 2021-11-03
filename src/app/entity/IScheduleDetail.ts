import {ISchedule} from "./ISchedule";
import {ISubject} from "./ISubject";
import {IStudyDayTime} from "./IStudyDayTime";

export interface IScheduleDetail {
  scheduleDetailId: number;
  subject: ISubject;
  studyDayTime: IStudyDayTime;
  schedule: ISchedule;
}
