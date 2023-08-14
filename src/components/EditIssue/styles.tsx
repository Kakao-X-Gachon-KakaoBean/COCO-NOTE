import styled from '@emotion/styled';

export const Input = styled.input`
  color: black;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #e6e8eb;
  border-radius: 8px;
  width: 35rem;
  height: 2rem;
  outline: none;
  font-size: 1.2rem;
  padding: 10px 15px 12px;
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1rem;
    font-weight: 200;
    color: #969696;
  }
`;

export const EditIssueBox = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr 10fr 1fr;
`;

export const EditIssueHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const EditIssueInput = styled.div`
  display: flex;
  align-items: center;
`;
export const EditIssueText = styled.div``;

export const EditIssueSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
