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
