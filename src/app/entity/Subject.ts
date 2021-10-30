import {ScheduleDetail} from "./ScheduleDetail";
import {Mark} from "./Mark";

export interface Subject {
  subjectId: number;
  subjectName: string;

  scheduleDetails: ScheduleDetail[];
  marks: Mark[];
}
