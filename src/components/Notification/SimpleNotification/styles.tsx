import styled from '@emotion/styled';

export const MoreBtn = styled.div`
  display: flex;
  height: 3.5vh;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.05);
    transition: background-color 0.5s ease;
  }
`;
export const MenuDiv = styled.div<{ hasRead: boolean }>`
  width: 15vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => (props.hasRead ? 'grey' : 'black')};
`;
