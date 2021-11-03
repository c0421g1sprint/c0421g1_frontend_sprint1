export class IScheduleSubject {
  private subjectId : number
  private scheduleDetailId : number
  // QuanTA them entiyDto de update 31/10/2021
  constructor(subjectId: number, scheduleDetailId: number) {
    this.subjectId = subjectId;
    this.scheduleDetailId = scheduleDetailId;
  }

}
