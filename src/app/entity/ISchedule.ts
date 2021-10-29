import {IClassGrade} from "./IClassGrade";
import {IScheduleDetail} from "./IScheduleDetail";

export interface ISchedule {
  scheduleId: number;

  classGrade: IClassGrade;
  scheduleDetailList: IScheduleDetail[];
}
