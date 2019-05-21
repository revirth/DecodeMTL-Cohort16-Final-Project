import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./main.css";
import "./style.css";

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usertype: 1
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

  handleIsSeller = event => {
    this.setState({ usertype: event.target.checked ? 2 : 1 });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("usertype", this.state.usertype);
    data.append("signuptype", 0);

    fetch("/auth/signup", {
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

  socialSignup = result => {
    let userId = "";
    let username = "";
    let signuptype = -1;
    if (result.socialN === "facebook") {
      userId = result.response.userID;
      username = result.response.name;
      signuptype = 1;
    }
    if (result.socialN === "google") {
      userId = result.response.googleId;
      username = result.response.profileObj.name;
      signuptype = 2;
    }
    const data = new FormData();
    data.append("userId", userId);
    data.append("username", username);
    data.append("signuptype", signuptype);
    data.append("usertype", this.state.usertype);
    fetch("/auth/socialSignup", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(headers => {
        return headers.text();
      })
      .then(body => {
        const parsed = JSON.parse(body);
        if (!parsed.status) {
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
                  <input type="checkbox" onChange={this.handleIsSeller} />
                  <span class="slider round" />
                </label>
              </div>

              <input
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white  bn grow signbtn"
                type="submit"
                value="Sign Me Up"
              />
            </form>
            <div className="mtop1 mbot1">
              <FacebookLogin
                appId="432661687560212"
                textButton="SignUp with Facebook"
                size="small"
                cssClass="custom-kep-login-facebook small"
                fields="name,email,picture"
                callback={r => {
                  this.socialSignup({ response: r, socialN: "facebook" });
                }}
              />
            </div>
            <div className="wrapper">
              <GoogleLogin
                clientId="552704391478-lk7u47rc53grh82k0mmcekegqc8lkuo4.apps.googleusercontent.com"
                buttonText="Signup with Google"
                className="custom-login-google"
                theme="dark"
                onSuccess={r => {
                  this.socialSignup({ response: r, socialN: "google" });
                }}
              />
            </div>
            <div className="btndiv">
              <button
                className="btn login-btn f6 link dim br3 ph3 pv2 mb2 dib white  bn grow"
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
