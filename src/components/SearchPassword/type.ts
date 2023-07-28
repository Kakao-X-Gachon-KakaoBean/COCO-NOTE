import { ChangeEvent } from 'react';

export interface PasswordModal {
  name: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onClosePasswordModal: () => void;
}
