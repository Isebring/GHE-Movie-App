import { Component, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  errorInfo?: {
    message?: string;
    image?: string;
    variant: "small" | "main";
  };
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
    const { image, message, variant } = this.props.errorInfo || {};

    if (this.state.hasError) {
      switch (variant) {
        case "small":
          return (
            <StyledSmallError>
              <h2>{message}</h2>
              <button onClick={() => window.location.reload()}>
                Refresh Page
              </button>
            </StyledSmallError>
          );
        case "main":
          return (
            <StyledMainError>
              {image && <img src={image} alt="Error" />}
              <p>{message}</p>
              <button onClick={() => window.history.back()}>Go back</button>
            </StyledMainError>
          );
        default:
          return <div>Error</div>;
      }
    }

    return this.props.children;
  }
}

const StyledMainError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  gap: 2rem;
  margin: 5rem 1rem;

  img {
    border-radius: 3%;
    max-width: 100%;
  }

  p {
    color: #fff;
    font-size: 1.3rem;
    font-family: system-ui, Arial, sans-serif;
    text-align: center;
  }

  button {
    padding: 1rem;
  }
`;

const StyledSmallError = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin: 1rem;

  h2 {
    color: #fff;
    font-size: 1.5rem;
    font-family: system-ui, Arial, sans-serif;
    margin: 0 0.5rem;
  }

  button {
    padding: 0.3rem;
  }
`;
export default ErrorBoundary;
