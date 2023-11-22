export interface ChangePasswordStatus {
  existingPassword: '' | 'error' | 'warning' | undefined;
  newPassword: '' | 'error' | 'warning' | undefined;
  confirmNewPassword: '' | 'error' | 'warning' | undefined;
}

export interface ChangePasswordInput {
  existingPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
