import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const whichThemeIsVar = makeVar(
  Boolean(
    localStorage.getItem("theme") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  )
);

export const setDark = () => {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "darkThemeIsEnabled");
  whichThemeIsVar(true);
};

export const setLight = () => {
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
  whichThemeIsVar(false);
};

export const setTheme = (what: boolean) => (what ? setDark() : setLight());

export const LogUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const LogUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://coffee-backend-lapto.herokuapp.com/"
      : "http://localhost:4000",
  cache: new InMemoryCache(),
});
