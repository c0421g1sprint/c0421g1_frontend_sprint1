import {IScheduleDetail} from "./IScheduleDetail";

export interface IStudyDayTime {
  studyDayTimeId: number;
  studyDayTimeStudyTime: string;
  studyDayTimeStudyDay: string;

  scheduleDetailList: IScheduleDetail[];
}
