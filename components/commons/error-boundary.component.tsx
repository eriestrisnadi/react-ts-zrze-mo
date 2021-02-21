import React, { Component, lazy, Suspense } from "react";
import Loading from "./loading.component";

const Card = lazy(() => import("./card.component"));

export type ErrorBoundaryType = "page" | "card" | "default";
export interface ErrorBoundaryProps {
  type?: ErrorBoundaryType;
}
export interface ErrorBoundaryState {}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps: ErrorBoundaryProps = {
    type: "default"
  };

  state = {
    error: null,
    errorInfo: null
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Suspense fallback={<Loading />}>
          <Card>Something went wrong.</Card>
        </Suspense>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
