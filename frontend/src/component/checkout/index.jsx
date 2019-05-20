import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

export default class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_9kvtGSlvXrGiwuS7NJ070Nrn006YjdNnpO">
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}
