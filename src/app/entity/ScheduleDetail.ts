
import {Subject} from './Subject';
import {StudyDayTime} from './StudyDayTime';
import {Schedule} from './Schedule';

export interface ScheduleDetail {
  scheduleDetailId: number;

  subject: Subject;
  studyDayTime: StudyDayTime;
  schedule: Schedule;
}
