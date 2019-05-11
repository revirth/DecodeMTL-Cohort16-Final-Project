import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LoginPopup from "../login/LoginPopup.jsx";
import SignupForm from "../login/SignupForm.jsx";
import { connect } from "react-redux";

class UnconnectedSimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    loggedIn: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logout = async () => {
    const res = await fetch("/logout");

    res.status && this.props.dispatch({ type: "afterLogout" });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Hi {this.props.username}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Order History</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    username: state.username
  };
};

let SimpleMenu = connect(mapStateToProps)(UnconnectedSimpleMenu);

export default SimpleMenu;
