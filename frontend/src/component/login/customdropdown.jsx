import React, { Component } from "react";
import "./dropdown.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

class Customdropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaymenu: false
    };
  }

  showMenu = event => {
    event.preventDeafult();
    this.setState({ displaymenu: true });
  };
  render() {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.showMenu}>
          {" "}
          Username{" "}
        </div>
        {this.state.displaymenu ? (
          <ul>
            <li className="active">
              <Link>Order History</Link>
            </li>
            <li>
              <Link>Account Settings</Link>
            </li>
            <li>
              <Link>Logout</Link>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Customdropdown;
