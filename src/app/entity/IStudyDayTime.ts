import {IScheduleDetail} from "./IScheduleDetail";

export interface IStudyDayTime {
  studyDayTimeId: number;
  studyDay: string;
  studyTime: string;

  scheduleDetailList: IScheduleDetail[];
}
