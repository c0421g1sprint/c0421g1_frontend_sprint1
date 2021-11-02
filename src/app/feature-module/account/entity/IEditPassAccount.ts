export interface IEditPasswordAccountDto {
  accountId: number;
  accountPassword: string;
  oldPassword: string;
  confirmPassword: string;
}
