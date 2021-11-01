import {IClassroom} from "./IClassroom";
import {ISchedule} from "./ISchedule";
import {ISubject} from "./ISubject";
import {IStudyDayTime} from "./IStudyDayTime";
import {IGrade} from "./IGrade";

export interface IScheduleDetail {
  // scheduleDetailId: number;
  //
  // subject: ISubject;
  // studyDayTime: IStudyDayTime;
  // schedule: ISchedule;

  scheduleDetailId: number;

  subject: ISubject;
  studyDayTime: IStudyDayTime;
  // classGrade: IGrade;
  schedule: ISchedule;
}
