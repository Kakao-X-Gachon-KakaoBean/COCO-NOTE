import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const BarDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 86%;
  height: 10%;
  position: fixed;
  top: 0;
  z-index: 10;
  left: 8.3%;
  padding-left: 2%;
  padding-right: 4%;
  border: 1pt solid #f2f2f2;
`;

export const TitleLink = styled(Link)`
  font-weight: 700;
  font-size: 1.8vw;
  font-family: SCDream6;
  text-decoration: none;
  color: #00b050;
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
  justify-content: space-between;
`;
