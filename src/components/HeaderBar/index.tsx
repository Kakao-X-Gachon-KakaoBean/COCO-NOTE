import { BarDiv, LogoDiv, OthersDiv, TitleLink } from '@components/HeaderBar/styles.tsx';
import Notification from '@components/HeaderBar/Notification';
import MyInfo from '@components/HeaderBar/MyInfo';

const HeaderBar = () => {
  return (
    <>
      <BarDiv>
        <LogoDiv>
          <TitleLink to="/main">COCO:NOTE</TitleLink>
        </LogoDiv>
        <OthersDiv>
          <Notification />
          <MyInfo />
        </OthersDiv>
      </BarDiv>
    </>
  );
};

export default HeaderBar;
