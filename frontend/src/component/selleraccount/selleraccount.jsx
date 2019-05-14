import React, { Component } from "react";
import "./custom.css";
import "./style.css";
import Shoppopup from "./updateshoppopup.jsx";
import UploadItem from "./uploadItem.jsx";
import EditSellerItems from "./EditSellerItems.jsx";

export default class selleraccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopdetails: false,
      uploaditems: false,
      showitems: false
    };
  }
  escFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 27) {
      this.setState({
        shopdetails: false,
        uploaditems: false,
        showitems: false
      });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.escFunction, false);
  // }

  shopDetails = event => {
    event.preventDefault();
    this.setState({ shopdetails: true });
  };

  uploadFile = event => {
    event.preventDefault();
    this.setState({ uploaditems: true });
  };

  showitems = event => {
    event.preventDefault();
    this.setState({ showitems: true });
  };

  render() {
    // let checkAdd = this.state.address ? {<SignupForm>} : null
    return (
      <div className="sellermain">
        <div className="internalSeller1">
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.shopDetails}
          >
            Update shop details
          </button>
          <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
            <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
              Shop Detail
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
        <div className="internalSeller">
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.uploadFile}
          >
            Upload Items
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.showitems}
          >
            View/Edit Item list
          </button>
        </div>
        {this.state.showitems ? <EditSellerItems /> : null}
        {this.state.uploaditems ? <UploadItem /> : null}
        {this.state.shopdetails ? <Shoppopup /> : null}
      </div>
    );
  }
}
