
import {IMark} from './IMark';
import {ScheduleDetail} from './ScheduleDetail';

export interface Subject {
  subjectId: number;
  subjectName: string;

  scheduleDetails: ScheduleDetail[];
  marks: IMark[];
}
