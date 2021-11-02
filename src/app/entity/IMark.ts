import {IStudent} from "./IStudent";
import {ISubject} from "./ISubject";

export interface IMark {
  markId: number;
  markPointNumber1: number;
  markPointNumber2: number;
  markPointNumber3: number;

  student: IStudent;
  subject: ISubject;
}
