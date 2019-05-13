import React, { Component } from "react";
import "./main.css";
import "./style.css";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",

      password: ""
    };
  }

  componentDidMount() {
    document.getElementById("Signupspace").focus();
  }
  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);

    data.append("password", this.state.password);
    fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        // console.log("responseBody from login", responseBody);
        // let body = JSON.parse(responseBody);
        // console.log("parsed body", body);
        if (!res.status) {
          alert("Username exist");
          return;
        } else {
          alert(" Bingo!! SignUp Successfull ");
          this.props.onClose();
        }
      });
  };

  render() {
    return (
      <div className="overlay">
        <div className="popup animate">
          {/* <div className="popup-img">
            <img src="/popup.jpg" />
          </div> */}
          <div className="login-form-div">
            <form className="mainform" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={this.handleUsername}
                className="login-field"
                id="Signupspace"
                required
              />

              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.handlePassword}
                className="login-field"
                required
              />
              <div className="sildertoggle">
                <p className="registertxt"> Register as a seller ? </p>
                <label class="switch tog">
                  <input type="checkbox" />
                  <span class="slider round" />
                </label>
              </div>

              <input
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow signbtn"
                type="submit"
                value="Sign Me Up"
              />
            </form>
            <div className="btndiv">
              <button
                className="btn login-btn f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
                onClick={this.props.onClose}
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
