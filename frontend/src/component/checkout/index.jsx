import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
// import "./custom.css";

export default class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_9kvtGSlvXrGiwuS7NJ070Nrn006YjdNnpO">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}
