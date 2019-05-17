import React, { Component } from "react";
import "./custom.css";
import "./style.css";
import Shoppopup from "./updateshoppopup.jsx";
import UploadItem from "./uploadItem.jsx";
import EditSellerItems from "./EditSellerItems.jsx";
import Userlist from "./Userlist.jsx";
// import Allreviews from "./Allreviews.jsx";
import { Link } from "react-router-dom";
import Sky_net from '../../component/sky_net/sky_net'

export default class selleraccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopdetails: false,
      uploaditems: false,
      showitems: false,
      userlist: false,
      // allreview: false,
      sellerdetails: {}
    };
  }
  escFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 27) {
      this.setState({
        shopdetails: false,
        uploaditems: false,
        showitems: false,
        userlist: false
        // allreview: false
      });
    }
  };
  componentDidMount = async () => {
    document.addEventListener("keydown", this.escFunction, false);
    let response = await fetch(`/auth/profile`);
    let data = await response.json();

    this.setState({ sellerdetails: data });

    console.table("test", data);
  };
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
  listOfuser = event => {
    event.preventDefault();
    this.setState({ userlist: true });
  };
  // reviews = event => {
  //   event.preventDefault();
  //   this.setState({ allreview: true });
  // };

  render() {
    // let checkAdd = this.state.address ? {<SignupForm>} : null
    return (
      <div className="sellermain">
        <div className="internalSeller1">
          <article class="center mw5 mw6-ns br3 ba b--black-10 mv4">
            <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
              Shop Detail
            </h1>

            <div class="pa3 bt b--black-10">
              <p class="f6 f5-ns lh-copy measure stylepara">
                <span>Street: {this.state.sellerdetails.street}</span>
                <span>Apartment No: {this.state.sellerdetails.apt}</span>
                <span>Postal:{this.state.sellerdetails.postal}</span>
                <span>Phone No:{this.state.sellerdetails.phone}</span>
                <span>Shop Name : {this.state.sellerdetails.shopname}</span>
              </p>
            </div>
          </article>
        </div>
        <div className="internalSeller">
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.shopDetails}
          >
            Update shop details
          </button>
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
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.listOfuser}
          >
            List of user
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.delivereditems}
          >
            Delivered items
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.orderLists}
          >
            Order Lists
          </button>
          {/* <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            onClick={this.reviews}
          >
            All reviews
          </button> */}
          <Link
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
            to="/sellerallreview"
          >
            All reviews
          </Link>
        </div>
        {this.state.showitems ? <EditSellerItems /> : null}
        {this.state.uploaditems ? <UploadItem /> : null}
        {this.state.shopdetails ? <Shoppopup /> : null}
        {this.state.userlist ? <Userlist /> : null}
        {/* {this.state.allreview ? <Allreviews /> : null} */}
      </div>
    );
  }
}
