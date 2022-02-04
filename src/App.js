import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import { ThemeProvider } from "styled-components";
import themes from "./theme.json";
import { GlobalStyle } from "./globalStyles";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme.colour")) || themes.dark
  );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar themes={themes} setTheme={setTheme} currentTheme={theme} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/incomes" element={<Incomes />} />
        <Route exact path="/expenses" element={<Expenses />} />
        <Route exact path="/goals" element={<Goals />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
