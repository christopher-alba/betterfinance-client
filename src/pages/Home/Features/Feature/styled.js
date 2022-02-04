import styled from "styled-components";

export const FeatureDiv = styled("div")`
  background: ${({ theme }) => theme.colors.tertiary};
  width: 20%;
  margin-right: 20px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px;
  &:last-of-type {
    margin-right: 0px;
  }
  @media (max-width: 1500px) {
    width: 640px;
    margin: 0 auto;
    margin-top: 20px;
    margin-right: auto !important;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const Image = styled("img")`
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`;

export const Icon = styled("i")`
  font-size: 5rem !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  margin: 0 auto !important;
`;

export const InnerDiv = styled("div")`
  text-align: center;
`;

export const IconDiv = styled("div")`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 30px;
  margin: 0 auto;
  border-radius: 50%;
`;
