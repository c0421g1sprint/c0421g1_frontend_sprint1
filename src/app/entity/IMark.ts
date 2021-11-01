import {IStudent} from "./IStudent";
import {ISubject} from "./ISubject";

export interface IMark {
  markId: number;
  pointNumber1: number;
  pointNumber2: number;
  pointNumber3: number;

  student: IStudent;
  subject: ISubject;
}
