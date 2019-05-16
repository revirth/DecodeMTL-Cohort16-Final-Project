import React, { Component } from "react";
import {connect} from 'react-redux'
import "./custom.css";
import "./style.css";
import Addresspopup from "./updateAddresspopup.jsx";
import Paymentpopup from "./updatePaymentpopup.jsx";
import Accountdetails from "./updateAccountdetails.jsx";

// export default class userprofile extends Component {
  class UnconnectedUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showaddress: false,
      payment: false,
      accountdetails: false,
      userdetails: {}
    };
  }
  escFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 27) {
      this.setState({
        showaddress: false,
        payment: false,
        accountdetails: false
      });
    }
  };
  componentDidMount = async () => {
    document.addEventListener("keydown", this.escFunction, false);
    if(this.props.loggedIn){
    let response = await fetch(`/auth/profile`);
    let data = await response.json();

    this.setState({ userdetails: data });

    console.table("test", data);
    }
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
  render() {
    // let checkAdd = this.state.address ? {<SignupForm>} : null
    let content = ""
    if(this.props.loggedIn){
      content=(<div className="mainsettings">
          <div className="settngdetials">
            <button
              className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
              onClick={this.updateAddress}
            >
              Update Address
            </button>
            <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
              <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                Address
              </h1>
              <div class="pa3 bt b--black-10">
                <p class="f6 f5-ns lh-copy measure stylepara">
                  <span>Street: {this.state.userdetails.street}</span>
                  <span>Apartment No: {this.state.userdetails.apt}</span>
                  <span>Postal:{this.state.userdetails.postal}</span>
                  <span>Phone No:{this.state.userdetails.phone}</span>
                </p>
              </div>
  
              {this.state.showaddress ? <Addresspopup /> : null}
            </article>
          </div>
          <div className="settngdetials">
            <button
              className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
              onClick={this.updatePayment}
            >
              Update Payment Options
            </button>
            <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
              <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                Payment
              </h1>
              <div class="pa3 bt b--black-10">
                <p class="f6 f5-ns lh-copy measure stylepara">
                  <span>Card No: {this.state.userdetails.cardno}</span>
                  <span>CVC No: {this.state.userdetails.cvc}</span>
                  <span>Expiry Date:{this.state.userdetails.expirydate}</span>
                  <span>Name On Card:{this.state.userdetails.nameonCard}</span>
                </p>
              </div>
              {this.state.payment ? <Paymentpopup /> : null}
            </article>
          </div>
          <div className="settngdetials">
            <button
              className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
              onClick={this.updateSettings}
            >
              Account detials
            </button>
            <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
              <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                Account Details
              </h1>
              <div class="pa3 bt b--black-10">
                <p class="f6 f5-ns lh-copy measure stylepara">
                  <span>Username: {this.state.userdetails.username}</span>
                  <span>Current Password: *************</span>
                  <span>Email:{this.state.userdetails.email}</span>
                </p>
              </div>
              {this.state.accountdetails ? <Accountdetails /> : null}
            </article>
          </div>
        </div>
      );
    }

      return content
        // return (
        //   <div className="mainsettings">
        //     <div className="settngdetials">
        //       <button
        //         className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
        //         onClick={this.updateAddress}
        //       >
        //         Update Address
        //       </button>
        //       <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
        //         <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
        //           Address
        //         </h1>
        //         <div class="pa3 bt b--black-10">
        //           <p class="f6 f5-ns lh-copy measure stylepara">
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
        //       <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
        //         <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
        //           Payment
        //         </h1>
        //         <div class="pa3 bt b--black-10">
        //           <p class="f6 f5-ns lh-copy measure stylepara">
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
        //       <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
        //         <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
        //           Account Details
        //         </h1>
        //         <div class="pa3 bt b--black-10">
        //           <p class="f6 f5-ns lh-copy measure stylepara">
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

let mapStatetoProps = (state) => {
  return {loggedIn: state.loggedIn}
}

let userprofile = connect(mapStatetoProps)(UnconnectedUserProfile)

export default userprofile
