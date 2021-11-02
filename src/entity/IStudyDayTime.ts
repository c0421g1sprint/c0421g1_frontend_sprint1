import {IScheduleDetail} from "./IScheduleDetail";

export interface IStudyDayTime {
  studyDayTimeId: number;
  studyDay: string;
  studyTime: string;

  scheduleDetailList: IScheduleDetail[];

  // studyDayTimeId: number;
  // studyDayTimeStudyTime: string;
  // studyDayTimeStudyDay: string;
  //
  // scheduleDetails: IScheduleDetail[];
}
