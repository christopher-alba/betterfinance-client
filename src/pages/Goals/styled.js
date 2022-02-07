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
`;

export const ChartDiv = styled("div")`
  background: ${({ theme }) =>
    theme.name === "light" ? "rgba(0, 0, 0, 0.05)" : "lightgray"};
  padding: 30px;
  border-radius: 5px;
`;
