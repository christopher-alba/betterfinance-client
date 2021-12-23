import { Header } from "semantic-ui-react";
import styled from "styled-components";
import { ReactComponent as mySVG } from "../../svg/logo.svg";

export const NavbarWrapper = styled("div")`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  transition: all 500ms ease;
  left: 0;
  opacity: 0;
  z-index: 0;
  background: ${({ theme }) => theme.colors.darkGreen};
  padding: 30px 0;
`;

export const NavbarBrandWrapper = styled("div")`
  display: flex;
  align-items: center;
  margin-right: 40px;
  @media(max-width:500px){
    margin-right:20px;
  }
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
  align-items: center;
`;
export const NavbarRight = styled("div")`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export const HomeHeading = styled("h3")`
  color: white;
  text-transform: uppercase;
  &:hover {
    color: ${({ theme }) => theme.colors.lightGreen};
  }
`;

export const ToolsTrigger = styled("span")`
  font-size: 1.28571429rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  &:hover {
    color: ${({ theme }) => theme.colors.lightGreen};
  }
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

  @media (min-width: 1050px) {
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

export const ToggleNav = styled(Header)`
  font-size: 2rem !important;
  width: 100%;
  height: 100px;
  padding: 10px;
  opacity: 0;
  transition: 1000ms ease all;
  color: ${({ theme }) => theme.colors.secondary};
  z-index: 10;
  @media (max-width: 1050px) {
    font-size: 1.25rem !important;
  }
`;
