export interface IEditAccount {
  accountId: number;
  accountUsername: string;
  accountPassword: string;
  email: string;
  activated_flag: boolean;
  lock_flag: boolean;
  delete_flag: boolean;
}
