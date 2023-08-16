import styled from '@emotion/styled';

export const ProjectSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 1rem;
`;

export const MemberSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 1rem;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  padding-top: 2rem;
`;
export const ProjectBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;
export const ProjectSubMit = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ProjectBodyTitle = styled.div`
  & div:first-child {
    color: gray;
    margin-bottom: 1rem;
  }

  & div:last-child {
    font-size: 1.3rem;
  }
`;
export const ProjectBodyExplain = styled.div`
  & div:first-child {
    color: gray;
    margin-bottom: 1rem;
  }

  & div:last-child {
    font-size: 1.3rem;
  }
`;
export const MemberHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  padding-top: 2rem;
`;
export const MemberHeaderLeft = styled.div``;
export const MemberHeaderRight = styled.div`
  display: flex;
  gap: 2rem;
`;

export const MemberList = styled.div``;

export const ProfileImg = styled.img`
  width: 2vw;
  height: 4vh;
  border-radius: 100%;
`;

export const ProfileNName = styled.div`
  align-items: center;
  display: flex;
  gap: 1vw;
`;
