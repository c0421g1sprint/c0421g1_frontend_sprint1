import {IAccountRole} from "./IAccountRole";
import {ITeacher} from "./ITeacher";

export interface IAccount {
  accountId: number;
  username: string;
  password: string;
  isActivated: boolean;
  isNotLocked: boolean;
  isDeleted: boolean;

  teacher: ITeacher;
  accountRoleList: IAccountRole[];

}


