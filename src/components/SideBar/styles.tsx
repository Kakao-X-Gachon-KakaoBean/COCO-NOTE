import styled from '@emotion/styled';

export const Wrapper = styled.div`
  background-color: white;
  width: 8vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 20;
  align-items: flex-start;
  overflow: hidden;
`;

export const ProjectWrapper = styled.div`
  background-color: white;
  width: 8vw;
  max-height: calc(100vh - 11vh);
  overflow-y: auto;
  position: fixed;
  top: 11vh; /* Height of logo */
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 20;
  align-items: flex-start;
`;

export const LogoImage = styled.img`
  width: 6vw;
  height: 11vh;
  margin-left: 1vw;
`;

export const Circle = styled.div`
  background-color: white;
  text-align: center;
  width: 6vw;
  height: 6vh;
  line-height: 6vh;
  font-weight: 500;
  clip-path: circle(2.5vw);
  padding: 1vw;
  margin-top: 0.9vh;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &.selected {
    background-color: #23c483;
    color: #ffffff;
  }

  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  outline: none;

  &:hover {
    background-color: #23c483;
    box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const AddCircle = styled(Circle)`
  &:hover {
    background-color: #188e5d;
    box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

export const InnerText = styled.div`
  font-size: 2vh;
`;
