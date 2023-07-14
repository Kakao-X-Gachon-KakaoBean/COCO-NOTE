import styled from '@emotion/styled';

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
