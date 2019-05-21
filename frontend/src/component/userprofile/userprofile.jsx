import React, { Component } from "react";
import { connect } from "react-redux";
import "./custom.css";
import "./style.css";
import Addresspopup from "./updateAddresspopup.jsx";
import Paymentpopup from "./updatePaymentpopup.jsx";
import Accountdetails from "./updateAccountdetails.jsx";
import { Link } from "react-router-dom";
import Jarvis from "../jarvis/jarvis.jsx";

// export default class userprofile extends Component {
class UnconnectedUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showaddress: false,
      payment: false,
      accountdetails: false,
      jarvis: false,
      userdetails: {}
    };
  }
  escFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 27) {
      this.setState({
        showaddress: false,
        payment: false,
        accountdetails: false,
        jarvis: false
      });
    }
  };
  closeAdressPopup = () => {
    this.setState({ showaddress: false });
  };
  closePayment = () => {
    this.setState({ payment: false });
  };
  closeAccountDetails = () => {
    this.setState({ accountdetails: false });
  };
  componentDidMount = async () => {
    document.addEventListener("keydown", this.escFunction, false);

    console.table(this.props);

    // if (this.props.loggedIn) {
    let response = await fetch(`/auth/profile`);
    let data = await response.json();

    this.setState({ userdetails: data });

    console.table("test", data);
    // }
  };
  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.escFunction, false);
  // }
  updatePayment = event => {
    event.preventDefault();
    this.setState({ payment: !this.state.payment });
  };

  updateAddress = event => {
    event.preventDefault();
    this.setState({ showaddress: !this.state.showaddress });
  };
  updateSettings = event => {
    event.preventDefault();
    this.setState({ accountdetails: !this.state.accountdetails });
  };
  jarvis = event => {
    event.preventDefault();
    this.setState({ jarvis: true });
  };
  render() {
    // let checkAdd = this.state.address ? {<SignupForm>} : null
    let content = "";
    if (this.props.loggedIn) {
      content = (
        <div className="mainsettings">
          <div className="usracc">
            <div className="settngdetials">
              <article className="center mw5 mw6-ns br3 ba b--black-10 mv4 flex-grow-1 usrprar">
                <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                  Address
                </h1>
                <div className="pa3 bt b--black-10">
                  <p className="f6 f5-ns lh-copy measure stylepara">
                    <span>Street: {this.state.userdetails.street}</span>
                    <span>Apartment No: {this.state.userdetails.apt}</span>
                    <span>Postal:{this.state.userdetails.postal}</span>
                    <span>Phone No:{this.state.userdetails.phone}</span>
                  </p>
                </div>

                {this.state.showaddress ? (
                  <Addresspopup onClose={this.closeAdressPopup} />
                ) : null}
              </article>
              <button
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white  bn grow settingsbtn"
                onClick={this.updateAddress}
              >
                Update Address
              </button>
            </div>
            <div className="settngdetials">
              <article className="center mw5 mw6-ns br3 ba b--black-10 mv4 flex-grow-1 usrprar">
                <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                  Payment
                </h1>
                <div className="pa3 bt b--black-10">
                  <p className="f6 f5-ns lh-copy measure stylepara">
                    <span>Card No: {this.state.userdetails.cardno}</span>
                    <span>CVC No: {this.state.userdetails.cvc}</span>
                    <span>Expiry Date:{this.state.userdetails.expirydate}</span>
                    <span>
                      Name On Card:{this.state.userdetails.nameonCard}
                    </span>
                  </p>
                </div>
                {this.state.accountdetails ? (
                  <Accountdetails onClose={this.closeAccountDetails} />
                ) : null}
              </article>
              <button
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white  bn grow"
                onClick={this.updateSettings}
              >
                Account detials
              </button>
            </div>

            <div className="settngdetials">
              <article className="center mw5 mw6-ns br3 ba b--black-10 mv4 flex-grow-1 usrprar">
                <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                  Account Details
                </h1>
                <div className="pa3 bt b--black-10">
                  <p className="f6 f5-ns lh-copy measure stylepara">
                    <span>Username: {this.state.userdetails.username}</span>
                    <span>Current Password: *************</span>
                    <span>Email:{this.state.userdetails.email}</span>
                  </p>
                </div>
                {this.state.payment ? (
                  <Paymentpopup onClose={this.closePayment} />
                ) : null}
              </article>
              <button
                className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white  bn grow"
                onClick={this.updatePayment}
              >
                Update Payment Options
              </button>
            </div>
          </div>

          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white  bn grow jarvis"
            onClick={this.jarvis}
          >
            <div className="jarviscx">
              <div>Customer Support</div>
            </div>
          </button>
          {this.state.jarvis ? <Jarvis /> : null}
        </div>
      );
    }

    return content;
    // return (
    //   <div className="mainsettings">
    //     <div className="settngdetials">
    //       <button
    //         className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
    //         onClick={this.updateAddress}
    //       >
    //         Update Address
    //       </button>
    //       <article className="center mw5 mw6-ns br3 ba b--black-10 mv4">
    //         <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
    //           Address
    //         </h1>
    //         <div className="pa3 bt b--black-10">
    //           <p className="f6 f5-ns lh-copy measure stylepara">
    //             <span>Street: {this.state.userdetails.street}</span>
    //             <span>Apartment No: {this.state.userdetails.apt}</span>
    //             <span>Postal:{this.state.userdetails.postal}</span>
    //             <span>Phone No:{this.state.userdetails.phone}</span>
    //           </p>
    //         </div>

    //         {this.state.showaddress ? <Addresspopup /> : null}
    //       </article>
    //     </div>
    //     <div className="settngdetials">
    //       <button
    //         className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
    //         onClick={this.updatePayment}
    //       >
    //         Update Payment Options
    //       </button>
    //       <article className="center mw5 mw6-ns br3 ba b--black-10 mv4">
    //         <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
    //           Payment
    //         </h1>
    //         <div className="pa3 bt b--black-10">
    //           <p className="f6 f5-ns lh-copy measure stylepara">
    //             <span>Card No: {this.state.userdetails.cardno}</span>
    //             <span>CVC No: {this.state.userdetails.cvc}</span>
    //             <span>Expiry Date:{this.state.userdetails.expirydate}</span>
    //             <span>Name On Card:{this.state.userdetails.nameonCard}</span>
    //           </p>
    //         </div>
    //         {this.state.payment ? <Paymentpopup /> : null}
    //       </article>
    //     </div>
    //     <div className="settngdetials">
    //       <button
    //         className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
    //         onClick={this.updateSettings}
    //       >
    //         Account detials
    //       </button>
    //       <article className="center mw5 mw6-ns br3 ba b--black-10 mv4">
    //         <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
    //           Account Details
    //         </h1>
    //         <div className="pa3 bt b--black-10">
    //           <p className="f6 f5-ns lh-copy measure stylepara">
    //             <span>Username: {this.state.userdetails.username}</span>
    //             <span>Current Password: *************</span>
    //             <span>Email:{this.state.userdetails.email}</span>
    //           </p>
    //         </div>
    //         {this.state.accountdetails ? <Accountdetails /> : null}
    //       </article>
    //     </div>
    //   </div>
    // );
  }
}

let mapStatetoProps = state => {
  return { loggedIn: state.loggedIn };
};

let userprofile = connect(mapStatetoProps)(UnconnectedUserProfile);

export default userprofile;
