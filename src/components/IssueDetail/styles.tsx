import styled from '@emotion/styled';

export const IssueDetailBox = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr 3fr 10fr auto;
  grid-gap: 1rem;
  align-self: center;
`;

export const IssueDetailTop = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const IssueDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div:first-child {
    font-size: 1.8rem;
    font-weight: bold;
  }
`;
export const IssueDetailHeaderButtonSection = styled.div`
  width: 8rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
export const IssueDetailBody = styled.div`
  border: 1px black solid;
`;
export const IssueDetailComment = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IssueDetailCommentInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1rem;
`;

export const EachCommentBox = styled.div`
  border: 1px gray solid;
  border-radius: 5px;
  padding: 1rem;
`;

export const EachCommentBoxHeader = styled.div`
  margin-bottom: 1rem;

  & div:first-child {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  & div:last-child {
    font-size: 0.8rem;
    color: gray;
  }
`;

export const EachCommentBoxBody = styled.div``;
