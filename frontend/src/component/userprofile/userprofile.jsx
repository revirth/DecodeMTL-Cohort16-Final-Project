import React, { Component } from "react";
import "./custom.css";
import "./style.css";
import Addresspopup from "./updateAddresspopup.jsx";

export default class userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showaddress: false
    };
  }
  escFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 27) {
      this.setState({ showaddress: false });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  updateAddress = event => {
    event.preventDefault();
    this.setState({ showaddress: !this.state.showaddress });
  };
  render() {
    // let checkAdd = this.state.address ? {<SignupForm>} : null
    return (
      <div className="mainsettings">
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
              <p class="f6 f5-ns lh-copy measure">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
            </div>

            {this.state.showaddress ? <Addresspopup /> : null}
          </article>
        </div>
        <div className="settngdetials">
          <button className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow">
            Update Payment Options
          </button>
          <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
            <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
              Payment
            </h1>
            <div class="pa3 bt b--black-10">
              <p class="f6 f5-ns lh-copy measure">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
            </div>
          </article>
        </div>
        <div className="settngdetials">
          <button className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow">
            Account detials
          </button>
          <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
            <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
              Account Details
            </h1>
            <div class="pa3 bt b--black-10">
              <p class="f6 f5-ns lh-copy measure">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
            </div>
          </article>
        </div>
      </div>
    );
  }
}
