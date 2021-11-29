import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { ThemeProvider } from "styled-components";
import themes from "./theme.json";
import { GlobalStyle } from "./globalStyles";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState(themes.dark);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar themes={themes} setTheme={setTheme} currentTheme={theme} />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
