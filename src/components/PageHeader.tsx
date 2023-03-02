import styled from "styled-components";

interface Props {
  children: string;
}

function PageHeader(props: Props) {
  return (
    <div>
      <StyledH2>{props.children}</StyledH2>
    </div>
  );
}

const StyledH2 = styled.h2`
  font-family: "Inter", system-ui, Arial, sans-serif;
  font-size: 1.5rem;
  color: white;
  padding: 0.7rem;
`;

export default PageHeader;
