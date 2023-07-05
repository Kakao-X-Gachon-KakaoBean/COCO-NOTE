import { ChangeEvent } from "react";

export interface PaswwordModal {
  name: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onClosePasswordModal: () => void;
  birth: string;
  onChangeBirth: (e: ChangeEvent<HTMLInputElement>) => void;
}
