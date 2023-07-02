import styled from "@emotion/styled";

export const Wrapper = styled.div`
  background-color: wheat;
  width: 8%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;

export const Circle = styled.div`
  background-color: white;
  text-align: center;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  font-weight: bold;
  clip-path: circle(2.5rem);
  padding: 15px;
`;
