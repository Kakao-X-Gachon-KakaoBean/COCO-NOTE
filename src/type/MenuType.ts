import React, { ReactNode } from 'react';

export interface Props {
  show: boolean;
  onCloseModal: (e: React.SyntheticEvent<EventTarget>) => void;
  closeButton?: boolean;
  children?: ReactNode;
}
