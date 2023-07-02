import {Circle, Wrapper} from "@components/SideBar/styles.tsx";

const SideBar = () => {
  return (
      <Wrapper>
          <Circle>
              <text>이미지</text>
          </Circle>
          <Circle>
              <text>프로젝트 1</text>
          </Circle>
          <Circle>
              <text style={{fontSize:"2rem"}}>+</text>
          </Circle>
      </Wrapper>
  );
};

export default SideBar;
