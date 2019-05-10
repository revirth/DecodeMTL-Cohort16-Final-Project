import React, { Component } from "react";
import { connect } from "react-redux";

export default class NavBarSearchBox extends Component {
  constructor() {
    super();

    this.state = { search: "" };
  }

  componentDidMount() {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);

    parsed.search && this.setState({ search: parsed.search });
  }

  handleSearch = () => {
    window.location.href = `/items?search=${this.state.search}`;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  keyPressed = e => {
    e.key === "Enter" && this.handleSearch();
  };

  render = () => (
    <span>
      <input
        type="text"
        name="search"
        value={this.state.search}
        onChange={this.handleChange}
        onKeyPress={this.keyPressed}
      />
      &nbsp;
      <i
        id="searchbutton"
        className="fa fa-search fa"
        onClick={this.handleSearch}
      />
    </span>
  );
}
