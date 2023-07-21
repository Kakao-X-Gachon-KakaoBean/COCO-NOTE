import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 72%;
  height: 93vh;
  margin-top: 7vh;
  margin-left: 28%;
`;

export const ComponentWrapper = styled.div`
  margin: 10vh 10vw 5vh 10vw;
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.text`
  font-size: larger;
  color: gray;
  margin-top: 3vh;

  &.title {
    font-size: xx-large;
    color: black;
    margin-bottom: 5vh;
  }

  &.contents {
    font-size: x-large;
    color: black;
    margin-bottom: 5vh;
  }
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid #aaa;
  line-height: 1rem;
  margin-top: 0.5rem;
`;

export const MemberList = styled.div`
  margin: 3vh 0 5vh 0;
`;
