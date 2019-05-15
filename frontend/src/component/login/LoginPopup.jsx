import React, { Component } from "react";
import SignupForm from "./SignupForm.jsx";
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { connect } from "react-redux";
import { updateCartInfo } from "../cartfooter/Cart.jsx";
import "./main.css";
import "./style.css";

class UnconnectedLoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      username: "",
      password: ""
    };
  }
  componentDidMount() {
    document.getElementById("loginspace").focus();
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  getCookie_utp = () => {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)utp\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.json();
      })
      .then(res => {
        if (!res.status) {
          alert("Incorrect Username or Password");
          return;
        } else {
          this.props.dispatch({
            type: "afterLogin",
            username: this.state.username,
            usertype: this.getCookie_utp()
          });
          updateCartInfo();
          this.props.onClose();
        }
      });
  };

  socialLogin = (result) => {
    let userId = ""
    if (result.socialN === "facebook") {
        userId = result.response.userID
      }
    if (result.socialN === "google") {
        userId = result.response.googleId
      }

      const data = new FormData()
      data.append("userId", userId)
      fetch("/socialLogin", { method: "POST", body: data, credentials: "include" }).then(headers => {
        return headers.text()
      }).then(body => {
        const parsed = JSON.parse(body)
        if (!parsed.status) {
          alert("User doesn't exist");
          return;
        } else {
          this.props.dispatch({
            type: "afterLogin",
            username: parsed.username,
            usertype: this.getCookie_utp()
          });
          updateCartInfo();
          this.props.onClose();
        }
      })
    
  }
   

  render() {
    return (
      <div className="overlay ">
        <div className="popup animate">
          {/* <div className="popup-img">
            <img src="/popup.jpg" />
          </div> */}
          <div className="login-form-div">
            <form className="mainform" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.handleUsername}
                className="login-field"
                id="loginspace"
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.handlePassword}
                className="login-field"
                required
              />
              <input
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow loginicon"
                type="submit"
                value="log In"
              />

              <span className="forgot-password">
                Forgot{" "}
                <a href="#" className="forgetlink">
                  password?
                </a>
              </span>
            </form>
            <div className="wrapper">
              <FacebookLogin
                appId="432661687560212"
                size="small"
                fields="name,email,picture"
                callback={(r) => { this.socialLogin({ response: r, socialN: "facebook" }) }} />
            </div>
            <div className="wrapper">
              <GoogleLogin
                clientId="552704391478-lk7u47rc53grh82k0mmcekegqc8lkuo4.apps.googleusercontent.com"
                buttonText="Login with Google"
                theme="dark"
                onSuccess={(r) => { this.socialLogin({ response: r, socialN: "google" }) }} />
            </div>
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

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let Login = connect()(UnconnectedLoginPopup);

export default Login;
