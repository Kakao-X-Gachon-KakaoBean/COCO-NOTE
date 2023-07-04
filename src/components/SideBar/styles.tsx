import styled from "@emotion/styled";

export const Wrapper = styled.div`
  background-color: wheat;
  width: 8%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Circle = styled.div`
  background-color: white;
  text-align: center;
  width: 6vw;
  height: 6vh;
  line-height: 6vh;
  font-weight: bold;
  clip-path: circle(2.5vw);
  padding: 1vw;
  margin-top: 2vh;
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid #aaa;
  line-height: 1vh;
  margin-top: 1vh;
  width: 6vw;
  margin-left: 1vw;
`;
