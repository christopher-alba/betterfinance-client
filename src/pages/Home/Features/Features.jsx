import React from "react";
import { Title } from "../../../components/Title";
import { Container } from "../../../components/Container";
import { FeaturesDiv, MainDiv } from "./styled";
import Feature from "./Feature";

const Features = () => {
  return (
    <MainDiv>
      <Container>
        <Title>Features</Title>
        <FeaturesDiv>
          <Feature
            title="MANAGE EXPENSES"
            description="Create, update, and delete your expenses in an easy to manage format. Visualise which expenses are draining your wallet using the graph."
            imageSrc="./testing.png"
            iconClass="angle double down icon"
          />
          <Feature
            title="MANAGE INCOMES"
            description="Create, update, and delete you incomes in an easy to manage format. Visualise which incomes are needing some work using the graph."
            imageSrc="./testing.png"
            iconClass="angle double up icon"
          />
          <Feature
            title="MANAGE GOALS"
            description="Create, update, and delete you financial goals in an easy to manage format. Visualise your progress towards your goals using the graph."
            imageSrc="./testing.png"
            iconClass="dollar sign icon"
          />
          <Feature
            title="MANAGE IT ALL"
            description="See how your incomes and expenses come together using the overview page. It also shows how much you have left to allocate towards your goals."
            imageSrc="./testing.png"
            iconClass="check icon"
          />
        </FeaturesDiv>
      </Container>
    </MainDiv>
  );
};

export default Features;
