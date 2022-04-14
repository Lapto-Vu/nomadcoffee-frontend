import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { whichThemeIsVar, setTheme, setDark, setLight } from "../apollo";

function Footer() {
  const themeState = useReactiveVar(whichThemeIsVar);
  useEffect(() => {
    setTheme(themeState);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="fixed bottom-0 w-screen h-12 bg-white shadow-md ring-1 text-gray-300 text-xs ring-slate-100 dark:ring-slate-900 flex justify-center items-center gap-4 dark:bg-slate-800">
      <span>© 2022 coffeegram from Lapto</span>
      <FontAwesomeIcon
        icon={themeState ? faSun : faMoon}
        className="cursor-pointer mt-1"
        onClick={() => (themeState ? setLight() : setDark())}
      />
    </div>
  );
}

export default Footer;
