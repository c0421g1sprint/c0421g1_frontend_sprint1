import {Teacher} from "./Teacher";
import {Role} from "./Role";

export interface Account {
  accountId: number;
  accountUsername: string;
  accountPassword: string;
  accountEmail: string;
  activated_flag: boolean;
  lock_flag: boolean;
  delete_flag: boolean;

  roles: Role[];
  teacher: Teacher;
}
