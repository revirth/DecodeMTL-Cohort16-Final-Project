import React, { Component } from "react";
//import "./main.css";
import "./style.css";

export default class Shoppopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      apt: "",
      postal: "",
      phone: "",
      shopname: ""
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
  handleShop = event => {
    this.setState({ shopname: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("street", this.state.street);
    data.append("apt", this.state.apt);
    data.append("postal", this.state.postal);
    data.append("phone", this.state.phone);
    data.append("shopname", this.state.shopname);
    fetch("/profile", {
      method: "PUT",
      body: data,
      credentials: "include"
    });
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
                type="text"
                placeholder="Enter your street(optional)"
                onChange={this.handleStreet}
                className="login-field"
                id="Signupspace"
              />

              <input
                type="text"
                placeholder="Enter your apartment number(optional)"
                onChange={this.handleApt}
                className="login-field"
              />
              <input
                type="text"
                placeholder="Enter your postal code(optional)"
                onChange={this.handlePost}
                className="login-field"
              />

              <input
                type="text"
                placeholder="Enter your Phone(optional)"
                onChange={this.handlePh}
                className="login-field"
              />
              <input
                type="text"
                placeholder="Enter your Shop Name(optional)"
                onChange={this.handleShop}
                className="login-field"
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
