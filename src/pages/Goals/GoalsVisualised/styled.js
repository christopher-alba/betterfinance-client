import styled from "styled-components";

export const ChartDiv = styled("div")`
  background: ${({ theme }) =>
    theme.name === "light" ? "rgba(0, 0, 0, 0.05)" : "lightgray"};
  padding: 30px;
  border-radius: 5px;
`;
