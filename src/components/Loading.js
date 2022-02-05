import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Loader } from "semantic-ui-react";

const Loading = ({ message }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Loader active inverted={themeContext.name === "dark" ? true : false}>
        <h1>{message}</h1>
      </Loader>
    </div>
  );
};

export default Loading;
