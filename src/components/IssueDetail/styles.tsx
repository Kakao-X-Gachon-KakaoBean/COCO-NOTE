import styled from '@emotion/styled';

export const IssueDetailBox = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-rows: 30px 70px auto auto;
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
export const IssueDetailFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 2rem;
  height: 3rem;
  color: #747575;
  background-color: #f4f8fc;
  border-top: 1px solid #d7e4e5;
  border-bottom: 1px solid #d7e4e5;
  position: relative;
`;

export const IssueDetailFooterMember = styled.div`
  display: flex;
  align-items: center;

  & div::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 15px;
    margin-left: 1rem;
    background-color: #747575;
  }
`;

export const ProfileImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.3rem;
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
  font-size: 0.8rem;
  color: gray;

  & div:last-child {
    font-weight: bold;
    padding: 0.3rem;
  }
`;

export const EachCommentBoxHeaderMember = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: black;
`;

export const EachCommentBoxBody = styled.div`
  padding: 0.3rem;
`;
