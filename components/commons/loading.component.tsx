import React, { Component } from "react";

export interface LoadingProps {}
export interface LoadingState {}

export class Loading extends Component<LoadingProps, LoadingState> {
  render() {
    return <div>Loading...</div>;
  }
}

export default Loading;
