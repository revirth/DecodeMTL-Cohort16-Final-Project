import React, { Component } from "react";
import "./pagination.scss";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  pageLink = page => {
    return `${window.location.pathname}?page=${page}&limit=${this.props.limit}`;
  };

  createPageNums = () => {
    let pages = [];
    const totalPage = this.props.total / this.props.limit + 1;

    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li>
          <Link to={this.pageLink(i)}>{i}</Link>
        </li>
      );
    }

    return pages;
  };

  render() {
    return <ul className="Pagination">{this.createPageNums()}</ul>;
  }
}
