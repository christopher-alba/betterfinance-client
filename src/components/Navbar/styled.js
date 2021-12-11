import styled from "styled-components";
import { ReactComponent as mySVG } from "../../svg/logo.svg";

export const NavbarWrapper = styled("div")`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background: ${({ theme }) => theme.colors.darkGreen};
  padding: 30px 0;
`;

export const NavbarBrandWrapper = styled("div")`
  display: flex;
  align-items: center;
`;

export const NavbarBrandBetter = styled("h1")`
  margin-bottom: 0;
  margin-top: 0;
  color: white;
  margin-right: 10px;
  @media (max-width: 400px) {
    font-size: 1.5rem;
    margin-right: 5px;
  }
`;

export const NavbarBrandFinance = styled("h1")`
  margin-bottom: 0;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.brightGreen};
  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

export const NavbarBrandLogo = styled(mySVG)`
  color: white;
  height: 40px;
  width: 40px;
  min-width: 40px;
  min-height: 40px;
  margin-right: 10px;
`;

export const NavbarLeft = styled("div")`
  display: flex;
  flex-wrap: nowrap;
`;
export const NavbarRight = styled("div")`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export const WaitingDiv = styled("div")`
  display: flex;
  align-items: center;
  border: 2px solid white;
  height: 100%;
  overflow: hidden;
  border-radius: 0.28571429rem;
  color: white;
  height: 36px;
  background: linear-gradient(
    90deg,
    rgba(11, 99, 99, 1) 0%,
    rgba(9, 121, 93, 1) 35%,
    rgba(0, 255, 196, 1) 100%
  );
  background-size: 300% 300%;
  animation: gradient 5s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (min-width: 1000px) {
    width: 300px;
  }
`;

export const WaitingDivText = styled("div")`
  width: 100%;
  text-align: center;
`;

export const AuthButtons = styled("div")`
  display: flex;
  flex-wrap: nowrap;
`;

export const NavbarMenu = styled("div")`
  display: flex;
  flex-direction: column;
  & > * {
    margin-top: 10px;
  }
`;

export const LoadingWrapper = styled("div")`
  width: 36px;
  height: 36px;
  margin-top: 0;
  position: relative;
  background: rgba(0, 0, 0, 0.05);
`;
