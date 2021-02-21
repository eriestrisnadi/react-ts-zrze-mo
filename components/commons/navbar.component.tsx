import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { stringify } from "query-string";
import Dropdown from "./dropdown.component";

export interface NavbarProps {
  history: any;
}
export interface NavbarState {}

class BaseNavbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);

    this.handleSearchInput = debounce(this.handleSearchInput.bind(this), 1000);
  }

  handleSearchInput(e: React.FormEvent<HTMLInputElement>) {
    const title = (e.target as HTMLInputElement).value;

    if (!!!title) {
      this.props.history.push("/");
      return;
    }

    this.props.history.push("/movies/search?" + stringify({ title }));
  }

  years(size: number = 5) {
    const currentYear = new Date().getUTCFullYear();
    return Array(currentYear - (currentYear - size))
      .fill("")
      .map((_v, idx) => currentYear - idx);
  }

  render() {
    return (
      <div className="bg-white px-5 py-2 flex flex-row gap-5 items-center shadow-md capitalize">
        <Link to="/" className="hidden sm:block">
          Home
        </Link>
        <div className="flex flex-grow gap-2 justify-center">
          <div className="flex justify-center flex-row items-center w-full md:w-2/3 border-2 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="outline-none py-1.5 p-2.5 rounded-xl flex-grow"
              onInput={this.handleSearchInput}
            />
            <Dropdown
              placeholder="Year"
              onChange={e => console.log(e)}
              items={this.years(10)}
            />
          </div>
        </div>
        <div className="hidden sm:flex flex-row items-center gap-5">
          <div role="button">Login</div>
          <div
            className="bg-blue-500 py-1.5 px-3 shadow-md text-white rounded-md"
            role="button"
          >
            Sign Up
          </div>
        </div>
      </div>
    );
  }
}

export const Navbar = withRouter(BaseNavbar);
export default Navbar;
