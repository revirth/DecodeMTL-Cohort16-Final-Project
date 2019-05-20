import React from "react";
import { Link } from "react-router-dom";
import "./reactnavbar.scss";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import chekUserSession from "../login/CheckUserSession";
import LoginPopup from "../login/LoginPopup.jsx";
import SignupForm from "../login/SignupForm.jsx";
import NavBarSearchBox from "../navbar-searchbox";
import Search from "./Search.jsx";
import Customdropdown from "../login/customdropdown.jsx";

// let Links = (props) => {

//   const loginOrProfile = (login) => {
//     // ternary operator statement ? (if true) : (if false)
//     return auth.isAuthenticated ?
//       // navbar if user is login= true
//       <div className="navbarmains">
//         <a href="/" className="titles">
//           Nutrition Fine Fourchette
//         </a>
//         <a href="#" onClick={this.menuToggle}>
//           MENU
//         </a>
//         <a href="/cart">ORDER</a>

//         <a href="#">DELIVERY</a>
//         <a href="/">ABOUT</a>
//         <a href="/">{this.props.username}</a>
//         <a href="/logout">LOGOUT</a>

//         <i id="searchbutton" className="fa fa-search fa" />
//         <input />
//       </div>

//       :

//       // navbar if user is login=false
//       <div className="navbarmains">
//         <a href="/" className="titles">
//           Nutrition Fine Fourchette
//         </a>
//         <a href="#" onClick={this.menuToggle}>
//           MENU
//         </a>
//         <a href="/cart">ORDER</a>

//         <a href="#">DELIVERY</a>
//         <a href="/">ABOUT</a>
//         <a href="/login">LOGIN</a>
//         <a href="/login">SIGNUP</a>
//         <i id="searchbutton" className="fa fa-search fa" />
//         <input />
//       </div>
//   };

class UnconnectedLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      signup: false,
      // loggedIn: false,
      search: false
    };
  }

  componentWillMount = () => {
    chekUserSession();
  };

  // closeLoginPopup = loggedIn => {
  closeLoginPopup = () => {
    this.setState({ popup: false });
  };
  closeSignup = () => {
    this.setState({ signup: false });
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username : "" ,
  //     login : false
  //   }
  // }
  escFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 27) {
      this.setState({ search: false, popup: false, signup: false });
    }
  };
  enterFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 13 && this.state.search === true) {
      console.log("enter status", "hello");
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    document.addEventListener("keydown", this.enterFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
    document.removeEventListener("keydown", this.enterFunction, false);
  }

  menuToggle() {
    let menus = document.querySelector(".menus");
    if (menus.style.display === "inline-block") {
      menus.style.display = "none";
    } else {
      menus.style.display = "inline-block";
    }
  }

  logout = async () => {
    const res = await fetch("/auth/logout");

    res.status && this.props.dispatch({ type: "afterLogout" });
  };

  render() {
    return (
      <div className="navbarmains">
        <Link to="/" className="titles">
          Nutrition Fine Fourchette
        </Link>
        <Link to="#" onClick={this.menuToggle}>
          MENU
        </Link>
        <Link to="/cart">ORDER</Link>
        <Link to="#">DELIVERY</Link>
        <Link to="/">ABOUT</Link>
        {!this.props.loggedIn ? (
          <span>
            <Link to="#" onClick={() => this.setState({ popup: true })}>
              LOGIN
            </Link>
            <Link to="#" onClick={() => this.setState({ signup: true })}>
              SIGNUP
            </Link>
          </span>
        ) : (
          <span className="afterlogin">
            Hi {this.props.username}
            {this.props.loggedIn && this.props.usertp === "1" ? (
              <span>
                <Link to="/profile">Account Setting</Link>
                <Link to="#" onClick={this.logout}>
                  LOGOUT
                </Link>{" "}
              </span>
            ) : (
              <span>
                <Link to="/sellerprofile">Seller Account</Link>
                <Link to="#" onClick={this.logout}>
                  LOGOUT
                </Link>
              </span>
            )}
          </span>
        )}

        {/* <i id="searchbutton" className="fa fa-search fa" />
        <input onClick={() => alert(`search ${this.value}`)} /> */}

        {/* <NavBarSearchBox /> */}

        <i
          id="searchbutton"
          className="fa fa-search fa"
          onClick={() => this.setState({ search: true })}
          onKeyDown={this.closeSerachPopup}
        />
        {this.state.search ? <Search /> : null}

        {this.state.popup ? (
          <LoginPopup onClose={this.closeLoginPopup} />
        ) : null}
        {this.state.signup ? <SignupForm onClose={this.closeSignup} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    username: state.username,
    usertp: state.usertype
  };
};

const Links = connect(mapStateToProps)(UnconnectedLinks);

export default class Navbar extends React.Component {
  render() {
    return (
      //main navbar selectors + links component based on if user is log or no
      <nav className="fixednav">
        <div className="navWide">
          <div className="wideDiv">
            {/* {loginOrProfile(props.login)} */}
            <Links />
          </div>
        </div>

        <Fade top>
          <div className="menus" onClick={this.menuToggle}>
            <Link to="/items" onClick={this.menuToggle} onClick={this.toggle}>
              WEEKLY
            </Link>
            <Link to="/items" onClick={this.menuToggle} onClick={this.toggle}>
              FITNESS
            </Link>
            <Link to="/items" onClick={this.menuToggle} onClick={this.toggle}>
              COOKED
            </Link>
          </div>
        </Fade>
        <div className="navNarrow" onClick={this.toggle}>
          <span>
            {" "}
            <i className="fas fa-hamburger fa-2x" />
          </span>

          <i className="fa fa-bars fa-2x" />
          <div className="narrowLinks hidden">
            <Links />
          </div>
        </div>
      </nav>
    );
  }

  toggle() {
    let narrowLinks = document.querySelector(".narrowLinks");
    narrowLinks.classList.toggle("hidden");
  }
  menuToggle() {
    let menus = document.querySelector(".menus");
    if (menus.style.display === "inline-block") {
      menus.style.display = "none";
    } else {
      menus.style.display = "inline-block";
    }
  }
}
