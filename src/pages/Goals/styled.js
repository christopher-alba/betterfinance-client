import styled from "styled-components";

export const MainDiv = styled("div")`
  padding-top: 200px;
  padding-bottom: 100px;
`;

export const NetIncomeDiv = styled("div")`
  padding: 20px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.tertiary};
  margin-top: 50px;
`;

export const NetIncomeRow = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NetIncomeHeading = styled("h1")`
  margin: 0;
`;

export const NetIncomeText = styled("p")`
  margin: 0;
  color: ${({ color, theme }) => {
    if (theme.name === "light") {
      if (color === "red") {
        return "red";
      } else if (color === "green") {
        return "green";
      }
    } else {
      if (color === "red") {
        return "red";
      } else if (color === "green") {
        return "lightgreen";
      }
    }
  }};
`;


