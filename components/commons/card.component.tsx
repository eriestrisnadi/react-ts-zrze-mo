import React, { Component } from "react";

export interface CardProps {
  className?: string;
}
export interface CardState {}

export class Card extends Component<CardProps, CardState> {
  static defaultProps = {
    className: null
  };

  render() {
    return (
      <div
        className={`bg-white rounded-xl shadow-md w-full relative ${(!!this
          .props.className &&
          this.props.className) ||
          ""}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Card;
