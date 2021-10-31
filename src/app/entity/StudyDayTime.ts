import {IScheduleDetail} from './IScheduleDetail';
import {ScheduleDetail} from './ScheduleDetail';

export interface StudyDayTime {
  studyDayTimeId: number;
  studyDay: string;
  studyTime: string;

  scheduleDetails: ScheduleDetail[];
}
