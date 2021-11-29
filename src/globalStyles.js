import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => {
      return theme.colors.primary;
    }};
    color: ${({ theme }) => {
      return theme.colors.secondary;
    }}
  }
`;
