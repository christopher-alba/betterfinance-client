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
import PrivateRoute from "./components/PrivateRoute";
import Unauthenticated from "./pages/Unauthenticated";

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
        <Route
          exact
          path="/incomes"
          element={
            <PrivateRoute page="incomes">
              <Incomes />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/expenses"
          element={
            <PrivateRoute page="expenses">
              <Expenses />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/goals"
          element={
            <PrivateRoute page="goals">
              <Goals />
            </PrivateRoute>
          }
        />
        <Route exact path="/unauthenticated" element={<Unauthenticated />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
