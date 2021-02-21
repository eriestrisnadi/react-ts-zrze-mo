import React, { Component } from "react";

export interface DropdownProps {
  placeholder?: string;
  onChange?: Function;
  items?: any[];
}
export interface DropdownState {}

export class Dropdown extends Component<DropdownProps, DropdownState> {
  static defaultProps = {
    placeholder: "",
    onChange: () => {},
    items: []
  };

  constructor(props: DropdownProps) {
    super(props);

    this.handleChangeItem = this.handleChangeItem.bind(this);
  }

  handleChangeItem(k: number) {
    this.props.onChange(this.props.items[k]);
  }

  render() {
    return (
      <div className="relative h-full">
        <button className="bg-transparent border-l-2 flex flex-row focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 font-semibold h-full hover:bg-gray-200 hover:text-gray-900 items-center md:inline md:w-auto px-2 text-gray-900 text-left text-sm w-full">
          <span>{this.props.placeholder}</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 rotate-180"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="absolute z-20 md:w-32 mt-2 origin-top-right right-0 w-full">
          <div className="bg-white rounded-lg shadow">
            {this.props.items.map((item, k) => (
              <button
                key={k}
                value={k}
                className={`w-full bg-transparent block focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:text-gray-900 font-semibold hover:bg-gray-200 hover:text-gray-900 md:mt-0 mt-2 px-4 py-2 text-sm ${(k ===
                  0 &&
                  "rounded-t-lg") ||
                  (k === this.props.items.length - 1 && "rounded-b-lg") ||
                  ""}`}
                onClick={() => this.handleChangeItem(k)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
