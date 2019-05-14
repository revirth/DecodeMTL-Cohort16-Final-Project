import React, { Component } from "react";
//import "./main.css";
import "./style.css";

export default class UploadItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namefood: "",
      price: "",
      file: "",
      description: ""
    };
  }

  handleFood = event => {
    this.setState({ namefood: event.target.value });
  };
  handleFile = event => {
    this.setState({ file: event.target.value });
  };

  handlePrice = event => {
    this.setState({ price: event.target.value });
  };
  handleDescription = event => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("name", this.state.namefood);
    data.append("price", this.state.price);
    data.append("imgUrl", this.state.file);
    data.append("description", this.state.description);
    fetch("/items", {
      method: "POST",
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
                placeholder="Enter Name of food(optional)"
                onChange={this.handleFood}
                className="login-field"
                id="Signupspace"
              />
              <input
                type="text"
                placeholder="Enter Description"
                onChange={this.handleDescription}
                className="login-field"
                id="Signupspace"
              />

              <input
                type="text"
                placeholder="Enter your Image URL"
                onChange={this.handleFile}
                className="login-field"
              />
              <input
                type="text"
                placeholder="Enter Price"
                onChange={this.handlePrice}
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
