import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import Button from "./Button";

const Container = styled.h1`
  background-color: ${(props) => props.theme.main.backgroundColor};
  color: ${(props) => props.theme.main.textColor};
`;

function Login() {
  return (
    <div>
      <Container>Login Page</Container>
      <button onClick={() => isLoggedInVar(true)}>Login</button>
      <Button />
    </div>
  );
}

export default Login;
