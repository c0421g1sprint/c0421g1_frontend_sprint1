import {IClassroom} from "./IClassroom";
import {IScheduleDetail} from "./IScheduleDetail";

export interface ISchedule {
  scheduleId: number;

  classGrade: IClassroom;
  scheduleDetailList: IScheduleDetail[];
}
