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
      <div className="overlay">
        <div className="popup w3-animate-top">
          <form className="mainform" onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="txtSearch"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyPress={this.keyPressed}
              className="search"
              placeholder="Hungry! Search for a food"
            />
          </form>
        </div>
      </div>
    );
  }
}
