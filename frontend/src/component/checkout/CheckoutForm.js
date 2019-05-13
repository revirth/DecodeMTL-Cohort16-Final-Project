import React, { Component } from "react";
import { connect } from "react-redux";
import { CardElement, injectStripe } from "react-stripe-elements";

class UnconnectedCheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({
      name: this.props.username
    });

    let form = new FormData();
    form.append("token", token.id);
    form.append("amount", Math.floor(Math.random() * 100000 + 1000));

    let response = await fetch("/charge", {
      method: "POST",
      // headers: {
      //   "Content-Type": "text/plain"
      // },
      body: form
    });

    if (response.ok) alert("Purchase Complete!");
  }

  render() {
    if (this.state.complete) return <h1> Purchase Complete </h1>;

    return (
      <div className="checkout">
        <p> Would you like to complete the purchase ? </p> <CardElement />
        <button onClick={this.submit}> Send </button>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username
  };
};

export default connect(mapStateToProps)(injectStripe(UnconnectedCheckoutForm));
