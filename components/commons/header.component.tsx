import React, { Component, ReactNode } from "react";

export interface HeaderProps {
  title: string;
  action?: ReactNode;
}
export interface HeaderState {}

export class Header extends Component<HeaderProps, HeaderState> {
  render() {
    return (
      <div className="flex flex-row my-5 items-end">
        <h1 className="flex-grow text-2xl">{this.props.title}</h1>
        {this.props.action}
      </div>
    );
  }
}

export default Header;
