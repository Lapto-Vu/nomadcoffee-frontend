import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import Button from "./Button";

const Container = styled.h1`
  background-color: ${(props) => props.theme.main.backgroundColor};
  color: ${(props) => props.theme.main.textColor};
`;

function Home() {
  return (
    <div>
      <Container>Home Page</Container>
      <button onClick={() => isLoggedInVar(false)}>Logout</button>
      <Button />
    </div>
  );
}

export default Home;
