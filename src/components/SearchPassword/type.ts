import { ReactNode } from 'react';

export interface PasswordModal {
  onClosePasswordModal?: () => void;
  children?: ReactNode;
}
