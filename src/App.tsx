import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Not from "./screens/Not";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, whichThemeIsVar } from "./apollo";

function App() {
  const currentTheme = useReactiveVar(whichThemeIsVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ThemeProvider theme={currentTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="*" element={<Not />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
