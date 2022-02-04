import styled from "styled-components";

export const Container = styled("div")`
  width: 90%;
  margin: 0 auto;
  display: ${({ flex }) => (flex ? "flex" : "block")};
  justify-content: ${({ justifyContent }) =>
    justifyContent !== undefined ? justifyContent : ""};
  align-items: ${({ alignItems }) =>
    alignItems !== undefined ? alignItems : ""};
  flex-direction: ${({ column }) => (column ? "column" : "")};
  text-align: ${({ textAlign }) => (textAlign !== undefined ? textAlign : "")};
`;
