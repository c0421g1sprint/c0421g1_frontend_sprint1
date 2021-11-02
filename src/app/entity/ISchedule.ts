import {IClassroom} from "./IClassroom";
import {IScheduleDetail} from "./IScheduleDetail";

export interface ISchedule {
  scheduleId: number;


  classroom: IClassroom;

  scheduleDetailList: IScheduleDetail[];
}
