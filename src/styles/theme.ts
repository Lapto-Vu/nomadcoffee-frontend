import { DefaultTheme } from "styled-components";

const lightTheme: DefaultTheme = {
  main: {
    backgroundColor: "red",
    textColor: "blue",
  },
};

const darkTheme: DefaultTheme = {
  main: {
    backgroundColor: "blue",
    textColor: "red",
  },
};

export { lightTheme, darkTheme };
