import {Classroom} from "./Classroom";
import {ScheduleDetail} from "./ScheduleDetail";

export interface Schedule {
  scheduleId: number;

  classroom: Classroom;
  scheduleDetails: ScheduleDetail[];
}
