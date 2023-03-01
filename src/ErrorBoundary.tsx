import { Component, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Styledh1>Something went wrong...</Styledh1>;
    }

    return this.props.children;
  }
}

const Styledh1 = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  color: white;
`;

export default ErrorBoundary;
