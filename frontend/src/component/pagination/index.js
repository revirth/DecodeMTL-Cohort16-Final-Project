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

  createPage = () => {
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
  createPageAtag = () => {
    let pages = [];
    const totalPage = this.props.total / this.props.limit + 1;

    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li>
          <a
            href={`${window.location.pathname}?page=${i}&limit=${
              this.props.limit
            }`}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

  render() {
    return (
      <ul className="Pagination">
        {this.createPage()}
        {this.createPageAtag()}
      </ul>
    );
  }
}
