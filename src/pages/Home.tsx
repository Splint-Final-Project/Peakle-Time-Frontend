import styled from "@emotion/styled";

const Button = styled.button`
  color: hotpink;
`;
export default function Home() {
  return (
    <div>
      <div>
        <h1>React App</h1>
        <p>React app with TypeScript</p>
        <Button>Styled Button</Button>
      </div>
    </div>
  );
}
