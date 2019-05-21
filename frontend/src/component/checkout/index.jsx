import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
//import "./custom.css";

export default class Checkout extends Component {
  render() {
    return (
      <div className="overlay2">
        <div className="w3-animate-bottom2">
          <div className="login-form-div2">
            <div className="tc">
              <i className="fas fa-hamburger fa-2x" />
              <h1 className="f4">Pay with your Debit/Credit Card</h1>
              <hr className=" bb bw1 b--black-10" />
            </div>
            <input
              className="fakeemail"
              type="email"
              placeholder="type your email"
            />
            <StripeProvider apiKey="pk_test_9kvtGSlvXrGiwuS7NJ070Nrn006YjdNnpO">
              <Elements>
                <CheckoutForm />
              </Elements>
            </StripeProvider>
          </div>
          <div className="styleoverstripe" />
        </div>
      </div>
    );
  }
}
