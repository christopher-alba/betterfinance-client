import styled from "styled-components";

const StyledTitle = styled("h1")`
  text-align: center;
  font-size: 3rem;
  text-transform: uppercase;
`;
const StyledHr = styled("hr")`
  width: 70px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

export const Title = ({ children }) => {
  return (
    <div>
      <StyledTitle>{children}</StyledTitle>
      <StyledHr></StyledHr>
    </div>
  );
};
