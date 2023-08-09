export interface CreateModalInput {
  title: string;
  version: string;
  status?: string;
}
export interface ModalProps {
  visible: boolean;
  handleOk: (input: CreateModalInput) => void;
}
export interface CreateManuscript {
  title: string;
  version: string;
  content: string;
  projectId: string;
}
