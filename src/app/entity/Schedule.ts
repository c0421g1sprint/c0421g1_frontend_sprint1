
import {Classroom} from './Classroom';
import {ScheduleDetail} from './ScheduleDetail';

export interface Schedule {
  scheduleId: number;

  deleteFlag: boolean;
  classroom: Classroom;
  scheduleDetails: ScheduleDetail[];
}
