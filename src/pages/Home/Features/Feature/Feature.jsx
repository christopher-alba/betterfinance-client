import React from "react";
import { Image, FeatureDiv, Icon, InnerDiv, IconDiv } from "./styled";

const Feature = ({ title, description, imageSrc, iconClass }) => {
  return (
    <>
      <FeatureDiv>
        <InnerDiv>
          <IconDiv>
            <Icon aria-hidden="true" className={iconClass}></Icon>
          </IconDiv>
          <h1>{title}</h1>
          <p>{description}</p>
        </InnerDiv>
        <Image src={imageSrc} alt="" />
      </FeatureDiv>
    </>
  );
};

export default Feature;
