export interface ModalVisibleProps {
  showProfileText: boolean;
  modalVisible: boolean;
  closeModal: () => void;
}

export interface ProfileImages {
  profileImg: string | undefined;
  thumbnailImg: string | null;
}
