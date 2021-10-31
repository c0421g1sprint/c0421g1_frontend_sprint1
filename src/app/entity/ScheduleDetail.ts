import {Subject} from "./Subject";
import {Classroom} from "./Classroom";
import {Schedule} from "./Schedule";
import {StudyDayTime} from './StudyDayTime';

export interface ScheduleDetail {
  scheduleDetailId: number;

  subject: Subject;
  studyDayTime: StudyDayTime;
  classroom: Classroom;
  schedule: Schedule;
}
