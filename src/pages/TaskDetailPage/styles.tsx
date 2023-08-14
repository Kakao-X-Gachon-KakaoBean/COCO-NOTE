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
  justify-content: space-between;
  margin-top: 5vh;
  margin-bottom: 3vh;
`;

export const HeaderText = styled.div`
  font-size: xx-large;
  color: Black;
`;

export const ContentsText = styled.div`
  font-size: large;
  color: Black;
  margin-bottom: 3vh;
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

export const WorkerNStatus = styled.div`
  width: 20vw;
  margin-bottom: 5vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WorkerName = styled.div`
  width: 8vw;
`;

export const ButtonDiv = styled.div`
  display: flex;
  gap: 1vw;
`;

export const ProfileImg = styled.img`
  width: 2vw;
  height: 4vh;
  border-radius: 100%;
`;
