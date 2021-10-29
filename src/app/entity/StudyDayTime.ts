import {ScheduleDetail} from './ScheduleDetail';

export interface StudyDayTime {
  studyDayTimeId: number;
  studyDayTimeStudyTime: string;
  studyDayTimeStudyDay: string;

  scheduleDetails: ScheduleDetail[];
}
