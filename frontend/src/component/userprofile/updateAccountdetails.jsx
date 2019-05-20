import React, { Component } from "react";
//import "./main.css";
import "./style.css";

export default class Accountdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmail = event => {
    this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let emailEntered = this.state.email;
    let passwordEntered = this.state.password;
    let data = new FormData();
    let parameters = 2;
    emailEntered ? data.append("email", emailEntered) : parameters--;
    passwordEntered ? data.append("password", passwordEntered) : parameters--;
    if (parameters > 0) {
      fetch("/auth/profile", {
        method: "PUT",
        body: data,
        credentials: "include"
      });
    }
  };
  render() {
    return (
      <div className="overlay">
        <div className="w3-animate-bottom">
          {/* <div className="popup-img">
            <img src="/popup.jpg" />
          </div> */}
          <div className="login-form-div">
            <form className="mainform" onSubmit={this.handleSubmit}>
              <input
                type="email"
                placeholder="Enter your new email(optional)"
                onChange={this.handleEmail}
                className="login-field"
                id="Signupspace"
              />

              <input
                type="password"
                placeholder="Enter your new password(optional)"
                onChange={this.handlePassword}
                className="login-field"
              />

              <input
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bn grow"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
