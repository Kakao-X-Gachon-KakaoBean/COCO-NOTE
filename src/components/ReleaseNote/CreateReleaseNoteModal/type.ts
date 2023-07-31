export interface CreateModalInput {
  title: string;
  key: string;
  contents: string;
  status: string;
}
export interface ModalProps {
  visible: boolean;
  handleOk: (input: CreateModalInput) => void;
}
