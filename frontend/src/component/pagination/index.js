import React, { Component } from "react";
import "./pagination.scss";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  pageLink = page => {
    return `${window.location.pathname}?page=${page}&limit=${this.props.limit}`;
  };

  handleClick = e => {
    parseInt(e.target.dataset.page) !== this.props.page &&
      this.props.history.push(e.target.dataset.to);
  };

  createPageNums = () => {
    let pages = [];
    const totalPage = this.props.total / this.props.limit + 1;

    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li
          key={i}
          onClick={this.handleClick}
          data-page={i}
          data-to={this.pageLink(i)}
          className={this.props.page === i ? "btcolor white active" : ""}
        >
          {i}
        </li>
      );
    }

    return pages;
  };

  render() {
    return <ul className="Pagination">{this.createPageNums()}</ul>;
  }
}
