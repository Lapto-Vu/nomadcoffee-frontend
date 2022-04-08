import styled from "styled-components";

const Container = styled.h1`
  background-color: ${(props) => props.theme.main.backgroundColor};
  color: ${(props) => props.theme.main.textColor};
`;

function Not() {
  return (
    <div>
      <Container>Not Found Page</Container>
    </div>
  );
}

export default Not;
