import styled from '@emotion/styled';

export const Wrapper = styled.div`
  background-color: white;
  width: 20%;
  height: 100%;
  position: fixed;
  top: 7%;
  left: 8%;
  z-index: 11;
  border: 1pt solid #f2f2f2;
`;

export const DropdownDiv = styled.div`
  height: 1rem;
  align-items: center;
  padding: 5%;
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid #aaa;
  line-height: 1rem;
  margin-top: 0.5rem;
`;

export const ScrollWrapper = styled.div`
  margin-top: 3rem;
  padding: 5%;
`;

export const HorizonText = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Text = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  text-decoration: none;
  color: black;
  font-family: SCDream4;
`;

export const ViewAll = styled.div`
  white-space: nowrap;
  margin-left: 1rem; /* "전체보기"와 "릴리즈 노트" 사이의 여백을 추가합니다 */
  font-size: x-small;
  text-decoration: none;
  color: black;
  font-family: SCDream2;
`;
