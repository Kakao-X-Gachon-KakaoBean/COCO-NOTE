import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 72%;
  height: 93vh;
  margin-top: 7vh;
  margin-left: 28%;
`;

export const ComponentWrapper = styled.div`
  margin: 10vh 5vw 5vh 5vw;
  display: flex;
  flex-direction: column;
`;

export const TitleNEdit = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 3vh;
  justify-content: space-between;
`;

export const HeaderText = styled.div`
  font-size: xx-large;
  color: Black;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

export const ContentsText = styled.div`
  font-size: large;
  color: Black;
  margin-bottom: 3vh;
`;

export const TaskText = styled.div`
  font-size: large;
  color: Black;
  margin-bottom: 3vh;
  margin-top: 10vh;
`;

export const Text = styled.div`
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

export const TaskDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 3vh;
  justify-content: space-between;

  & > div {
    min-width: 10vw; /* 원하는 너비로 조정 */
  }
`;

export const TitleDiv = styled.div``;

export const DescDiv = styled.div`
  margin-right: 10vw;
`;

export const PreviewAvatarDiv = styled.div`
  background-color: white;
  margin-right: 1vw;
`;

export const WorkerNStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const WorkerName = styled.div`
  width: 10vw;
`;

export const ButtonDiv = styled.div`
  display: flex;
  gap: 1vw;
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid #aaa;
  line-height: 1rem;
  margin-top: 0.5rem;
`;

export const MemberList = styled.div`
  margin: 3vh 0 5vh 0;
`;

export const ProfileImg = styled.img`
  width: 2vw;
  height: 4vh;
  border-radius: 100%;
`;
