import React, { Component } from "react";

export interface DropdownProps {
  placeholder?: string;
  onChange?: Function;
  items?: any[];
}
export interface DropdownState {
  placeholder: string;
  isOpen: boolean;
}

export class Dropdown extends Component<DropdownProps, DropdownState> {
  static defaultProps = {
    placeholder: "",
    onChange: () => {},
    items: []
  };

  constructor(props: DropdownProps) {
    super(props);

    this.state = { placeholder: props.placeholder, isOpen: false };

    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.resetItem = this.resetItem.bind(this);
  }

  handleChangeItem(k: number) {
    const placeholder = this.props.items[k];
    this.setState({ placeholder, isOpen: false });
    this.props.onChange(placeholder);
  }

  resetItem() {
    this.setState({ placeholder: this.props.placeholder, isOpen: false });
    this.props.onChange(null);
  }

  render() {
    return (
      <div className="relative h-full">
        <button
          className="bg-transparent border-l-2 flex flex-row focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 font-semibold h-full hover:bg-gray-200 hover:text-gray-900 items-center md:inline md:w-auto px-2 text-gray-900 text-left text-sm w-full"
          onClick={() => this.setState({ isOpen: !!!this.state.isOpen })}
        >
          <span>{this.state.placeholder}</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${
              !!this.state.isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`z-20 md:w-32 mt-2 origin-top-right right-0 w-full ${
            !!this.state.isOpen ? "absolute" : "hidden"
          }`}
        >
          <div className="bg-white rounded-lg shadow">
            {this.props.items.map((item, k) => (
              <button
                key={k}
                className={`w-full bg-transparent block focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 font-semibold hover:bg-gray-200 hover:text-gray-900 md:mt-0 mt-2 px-4 py-2 text-sm ${(k ===
                  0 &&
                  "rounded-t-lg") ||
                  (this.props.placeholder === this.state.placeholder &&
                    k === this.props.items.length - 1 &&
                    "rounded-b-lg") ||
                  ""}`}
                onClick={() => this.handleChangeItem(k)}
              >
                {item}
              </button>
            ))}
            {this.props.placeholder !== this.state.placeholder && (
              <button
                className="w-full bg-transparent block focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 font-semibold hover:bg-gray-200 hover:text-gray-900 md:mt-0 mt-2 px-4 py-2 text-sm rounded-b-lg"
                onClick={this.resetItem}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
