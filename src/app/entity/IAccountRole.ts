import {IRole} from "./IRole";
import {IAccount} from "./IAccount";

export interface IAccountRole {
  accountRoleId: number;

  account: IAccount;
  role: IRole;
}
