import React, { Component } from "react";
import "./serachbar.css";

export default class Search extends Component {
  constructor() {
    super();

    this.state = { search: "" };
  }

  componentDidMount = () => {
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);

    parsed.search && this.setState({ search: parsed.search });

    document.getElementById("txtSearch").focus();
  };
  handleSubmit = event => {
    event.preventDefault();

    window.location.href = `/items?search=${this.state.search}`;
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="overlay1">
        <div className="popup1 w3-animate-top">
          <form className="mainform1" onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="txtSearch"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyPress={this.keyPressed}
              className="search1"
              placeholder="Hungry! Search for a food"
            />
          </form>
        </div>
      </div>
    );
  }
}
