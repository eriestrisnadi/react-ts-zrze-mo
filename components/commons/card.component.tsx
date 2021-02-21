import React, { Component } from "react";

export interface CardProps {}
export interface CardState {}

export class Card extends Component<CardProps, CardState> {
  render() {
    return (
      <div className="bg-white rounded-xl shadow-md w-full relative">
        {this.props.children}
      </div>
    );
  }
}

export default Card;
