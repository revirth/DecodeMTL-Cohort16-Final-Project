// import ReactDOM from "react-dom";
import "./main.css";
import "./style.css";
import React, { Component } from "react";
import Product from "./product.jsx";
import { item } from "./items.js";
import { connect } from "react-redux";
import Pagination from "../pagination";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "React",
      cart: [],
      items: []
    };
  }

  componentDidMount = async () => {
    // let fetchUrl = `/items${window.location.search}`;
    // let response = await fetch(fetchUrl);
    // let data = await response.json();

    // if (Array.isArray(data.items))
    //   this.setState({
    //     items: data.items,
    //     page: data.page,
    //     total: data.total,
    //     limit: data.limit
    //   });
    this.requestItems();
  };

  requestItems = async () => {
    let fetchUrl = `/items${window.location.search}`;
    let response = await fetch(fetchUrl, {
      method: "GET",
      credentials: "include"
    });
    let data = await response.json();

    if (Array.isArray(data.items))
      this.setState({
        items: data.items,
        page: data.page,
        total: data.total,
        limit: data.limit
      });
    console.table(data);
  };

  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  // ...

  render() {
    console.log("state", this.state);
    return (
      <div>
        <div>
          <main className="pa3 pa5-ns flex flex-wrap">
            {this.state.items.map(p => (
              <Product key={p.id} {...p} usertype={this.state.usertype} />
            ))}
          </main>
        </div>
        <div>
          <Pagination
            limit={this.state.limit}
            total={this.state.total}
            page={this.state.page}
          />
        </div>
      </div>
    );
  }
}

let mapStatetoProps = state => {
  return state;
};

let app = connect(mapStatetoProps)(UnconnectedApp);

export default app;
// ReactDOM.render(<App />, document.getElementById("root"));
