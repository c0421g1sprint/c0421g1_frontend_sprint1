import {IScheduleDetail} from "./IScheduleDetail";
import {IMark} from "./IMark";

export interface ISubject {
  subjectId: number;
  subjectName: string;

  scheduleDetailList: IScheduleDetail[];
  markList: IMark[];
}
