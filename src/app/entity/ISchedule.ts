import {IClassroom} from "./IClassroom";
import {IScheduleDetail} from "./IScheduleDetail";
import {IGrade} from "./IGrade";

export interface ISchedule {
  // scheduleId: number;
  //
  // classroom: IClassroom;
  // scheduleDetailList: IScheduleDetail[];

  scheduleId: number;
  classroom: IClassroom;
  scheduleDetails: IScheduleDetail[];
}
