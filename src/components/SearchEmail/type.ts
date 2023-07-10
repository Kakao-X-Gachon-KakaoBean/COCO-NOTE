import { ChangeEvent } from 'react';

export interface EmailModal {
  name: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onCloseEmailModal: () => void;
  birth: string;
  onChangeBirth: (e: ChangeEvent<HTMLInputElement>) => void;
}
export interface Search {
  name: string;
  birth: string;
  email: string;
}
