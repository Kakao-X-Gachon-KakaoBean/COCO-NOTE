import styled from '@emotion/styled';

export const Wrapper = styled.div`
  background-color: white;
  width: 8%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  flex-wrap: wrap;
  z-index: 20;
  align-items: flex-start;
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
  margin-top: 2vh;
  cursor: pointer;
  display: flex;
  justify-content: center;
  &.selected {
    background-color: gray;
    color: #ffffff;
  }
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  outline: none;

  &:hover {
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid #aaa;
  line-height: 1vh;
  margin-top: 1vh;
  width: 6vw;
  margin-left: 1vw;
`;

export const InnerText = styled.div`
  font-size: 2vh;
`;
