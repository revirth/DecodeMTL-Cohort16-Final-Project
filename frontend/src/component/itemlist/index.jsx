import "./main.css";
import "./style.css";
import React, { Component } from "react";
import Product from "./product.jsx";
import { item } from "./items.js";
import { connect } from "react-redux";
import Pagination from "../pagination";
import { Helmet } from "react-helmet";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "React",
      cart: [],
      items: []
    };
  }

  reloadItems = async () => {
    let fetchUrl = `/items${window.location.search}`;
    let response = await fetch(fetchUrl, {
      method: "GET",
      credentials: "include"
    });
    let data = await response.json();

    if (Array.isArray(data.items))
      this.setState({
        query: window.location.search,
        items: data.items,
        page: data.page,
        total: data.total,
        limit: data.limit
      });
    // console.table(data);
  };

  componentDidMount = async () => {
    await this.reloadItems();
  };

  componentDidUpdate = async prevProps => {
    prevProps.location.search !== this.props.location.search &&
      (await this.reloadItems());
  };

  render() {
    window.scrollTo(0, 0);
    // console.log("state", this.state);
    return (
      <div>
        <Helmet>
          <title>Nutrition Fine Fourchette Menu</title>
        </Helmet>
        <div>
          <main className="pa3 pa5-ns flex flex-wrap">
            {this.state.items.map(p => (
              <Product key={p._id} {...p} usertype={this.state.usertype} />
            ))}
          </main>
        </div>
        <div>
          <Pagination
            limit={this.state.limit}
            total={this.state.total}
            page={this.state.page}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

let mapStatetoProps = state => {
  return { ...state };
};

let app = connect(mapStatetoProps)(UnconnectedApp);

export default app;
