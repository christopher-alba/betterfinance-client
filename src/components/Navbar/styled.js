import styled from "styled-components";
import { ReactComponent as mySVG } from "../../svg/logo.svg";

export const NavbarWrapper = styled("div")`
  width: 100%;
  height: fit-content;
  display: flex;
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
`;

export const NavbarBrandFinance = styled("h1")`
  margin-bottom: 0;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.brightGreen};
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
`;

export const NavbarAuth = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 0.28571429rem;
  color: white;
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
`;

export const AuthButtons = styled("div")`
  display:flex;
  flex-wrap:nowrap;
`;