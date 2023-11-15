export interface ModalVisibleProps {
  showProfileText: boolean;
  modalVisible: boolean;
  closeModal: () => void;
}

export interface ProfileImages {
  profileImg: File | null;
  thumbnailImg: File | null;
}
