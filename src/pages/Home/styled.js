import styled from "styled-components";
import { ReactComponent as mySVG } from "../../svg/logo.svg";

export const HeroDiv = styled("div")`
  height: 834px;
  background: ${({ theme }) => theme.colors.darkGreen};
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    height: 100vh;
  }
`;

export const BetterFinanceHeader = styled("h1")`
  color: white;
  font-size: 3rem;
  text-transform: uppercase;
  margin: 0;
`;

export const BetterMoneyHeader = styled("h1")`
  color: white;
  font-size: 2.7rem;
  text-transform: uppercase;
  margin: 0;
`;

export const BetterFutureHeader = styled("h1")`
  color: white;
  font-size: 2.4rem;
  text-transform: uppercase;
  margin: 0;
`;

export const BetterLifeHeader = styled("h1")`
  color: ${({ theme }) => theme.colors.lightGreen};
  font-size: 2.1rem;
  text-transform: uppercase;
  margin: 0;
`;

export const Logo = styled(mySVG)`
  color: white;
  height: 80px;
  width: 80px;
  min-width: 40px;
  min-height: 40px;
  margin-right: 10px;
`;
