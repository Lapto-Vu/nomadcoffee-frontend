import { whichThemeIsVar } from "../apollo";

function Button() {
  return (
    <div>
      <button onClick={() => whichThemeIsVar(true)}>Light Theme</button>
      <button onClick={() => whichThemeIsVar(false)}>Dark Theme</button>
    </div>
  );
}

export default Button;
