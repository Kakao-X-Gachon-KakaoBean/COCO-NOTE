import styled from '@emotion/styled';

export const NotificationTitle = styled.div`
  display: flex;
  width: 77%;
  align-items: flex-start;
  font-family: SCDream5;
  font-size: 1.8vw;
  margin-bottom: 2vh;
`;
export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const ProjectName = styled.div`
  width: 20vw;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: SCDream4;
`;
export const Content = styled.div`
  width: 40vw;
  margin-left: 2vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: SCDream3;
`;

export const Date = styled.div`
  font-family: SCDream3;
`;
export const ProjectContent = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Notification = styled.div<{ hasRead: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${props => (props.hasRead ? 'grey' : 'black')};
`;

export const MoreBtn = styled.div`
  display: flex;
  width: 77%;
  align-items: flex-start;
  padding: 1vh 0 3vh 0;
`;
