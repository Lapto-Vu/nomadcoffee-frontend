import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      token: token ? token : "",
    },
  };
});

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://coffee-backend-lapto.herokuapp.com/"
      : "http://192.168.0.48:4000",
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

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
