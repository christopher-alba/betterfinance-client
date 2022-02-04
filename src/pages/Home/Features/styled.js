import styled from "styled-components";

export const MainDiv = styled("div")`
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const FeaturesDiv = styled("div")`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  @media (max-width: 1500px) {
    flex-direction: column;
  } ;
`;
