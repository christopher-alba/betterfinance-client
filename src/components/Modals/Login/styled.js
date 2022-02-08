import { Button } from "semantic-ui-react";
import styled from "styled-components";

export const ModalDiv = styled("div")`
  padding: 30px;
  display:flex;
  flex-direction:column;
  color: black;
`;

export const LoginButton = styled(Button)`
  margin: 0 !important;
  @media (max-width: 1050px) {
    margin-top: 10px !important;
  }
`;
