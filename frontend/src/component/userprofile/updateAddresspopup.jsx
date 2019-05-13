import React, { Component } from "react";
//import "./main.css";
import "./style.css";

export default class Addresspopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      apt: "",
      postal: "",
      phone: ""
    };
  }

  handleStreet = event => {
    this.setState({ street: event.target.value });
  };
  handleApt = event => {
    this.setState({ apt: event.target.value });
  };
  handlePost = event => {
    this.setState({ postal: event.target.value });
  };
  handlePh = event => {
    this.setState({ phone: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div className="overlay">
        <div className="popup w3-animate-top">
          {/* <div className="popup-img">
            <img src="/popup.jpg" />
          </div> */}
          <div className="login-form-div">
            <form className="mainform" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Enter your street"
                onChange={this.handleStreet}
                className="login-field"
                id="Signupspace"
                required
              />

              <input
                type="text"
                placeholder="Enter your apartment number"
                onChange={this.handleApt}
                className="login-field"
                required
              />
              <input
                type="text"
                placeholder="Enter your postal code"
                onChange={this.handlePost}
                className="login-field"
                required
              />

              <input
                type="text"
                placeholder="Enter your Phone"
                onChange={this.handlePh}
                className="login-field"
                required
              />

              <input
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
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
