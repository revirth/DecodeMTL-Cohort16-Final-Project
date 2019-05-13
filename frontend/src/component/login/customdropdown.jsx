import React, { Component } from "react";
import "./dropdown.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedCustomdropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaymenu: false
    };
    this.showMenu = this.showMenu.bind(this);
  }

  showMenu = event => {
    //event.preventDeafult();
    this.setState({ displaymenu: !this.state.displaymenu });
  };

  render() {
    return (
      <div className="dropdown">
        <button className="button" onClick={this.showMenu}>
          Hi {this.props.username}
        </button>
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
const mapStateToProps = state => {
  return {
    username: state.username
  };
};
let Customdropdown = connect(mapStateToProps)(UnconnectedCustomdropdown);

export default Customdropdown;
