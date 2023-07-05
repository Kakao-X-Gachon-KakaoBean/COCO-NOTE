import {
  ChangeInfoBtnDiv,
  ChangeInfoDiv,
} from "@components/MyInfoCard/ChangeInfoBtn/styles.tsx";
import ChangePasswordModal from "@components/MyInfoCard/ChangeInfoBtn/ChangePasswordModal";
import WithdrawAccountModal from "@components/MyInfoCard/ChangeInfoBtn/WithdrawAccountModal";

const ChangeInfoBtn = () => {
  return (
    <ChangeInfoDiv>
      <ChangeInfoBtnDiv>
        <ChangePasswordModal />
      </ChangeInfoBtnDiv>
      <ChangeInfoBtnDiv>
        <WithdrawAccountModal />
      </ChangeInfoBtnDiv>
    </ChangeInfoDiv>
  );
};

export default ChangeInfoBtn;
