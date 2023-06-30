import styled from "@emotion/styled";
export const BarDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  width: 91%;
  height: 7vh;
  position: fixed;
  top: 0;
  z-index: 10;
  left: 8%;
  padding: 0 5% 0 1%;
`;

export const LogoDiv = styled.div`
  width: 12%;
  justify-content: center;
  align-items: center;
  font-size: 1.4vw;
`;

export const OthersDiv = styled.div`
  width: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
