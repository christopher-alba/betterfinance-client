import styled from "styled-components";

export const MainDiv = styled("div")`
  padding-top: 200px;
  padding-bottom: 100px;
`;

export const ChartDiv = styled("div")`
  background: ${({ theme }) =>
    theme.name === "light" ? "rgba(0, 0, 0, 0.05)" : "lightgray"};
  padding: 30px;
  border-radius: 5px;
`;
