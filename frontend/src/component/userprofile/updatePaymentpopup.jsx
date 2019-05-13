import React, { Component } from "react";
//import "./main.css";
import "./style.css";

export default class Paymentpopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardno: "",
      cvc: "123",
      expirydate: "",
      name: ""
    };
  }

  cardNo = event => {
    this.setState({ cardno: event.target.value });
  };
  cvc = event => {
    this.setState({ cvc: event.target.value });
  };
  expiryDate = event => {
    this.setState({ expirydate: event.target.value });
  };
  cardName = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
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
                placeholder="Credit/Debit card No"
                onChange={this.cardNo}
                className="login-field"
                id="Signupspace"
                required
              />

              <input
                type="text"
                placeholder="CVC number"
                onChange={this.cvc}
                className="login-field"
                required
              />
              <input
                type="date"
                placeholder="Expiry Date"
                onChange={this.expiryDate}
                className="login-field"
                required
              />

              <input
                type="text"
                placeholder="Enter name on the card"
                onChange={this.Cardname}
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
