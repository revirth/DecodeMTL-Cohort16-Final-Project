import React, { Component } from "react";
// import "./custom.css";
import "./custom.scss";
import "./style.css";
import Shoppopup from "./updateshoppopup.jsx";
import UploadItem from "./uploadItem.jsx";
import EditSellerItems from "./EditSellerItems.jsx";
import Userlist from "./Userlist.jsx";
// import Allreviews from "./Allreviews.jsx";
import { Link } from "react-router-dom";
import Sky_net from "../../component/sky_net/sky_net";
import ReactMap from "../map/map.jsx";
import footer from "./footerbasic.png";
import "./footerstyle1.scss";

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

  closeshopdetails = () => {
    this.setState({ shopdetails: false });
  };
  closeUploaditems = () => {
    this.setState({ uploaditems: false });
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
      // <div className="sellermaindiv">
      <div className="mainsellerdiv">
        <div className="dashboardnav">DASHBOARD</div>
        <div className="sellerpanel">
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn"
            onClick={this.shopDetails}
          >
            <i class="fas fa-store" />
            Update shop details
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn"
            onClick={this.uploadFile}
          >
            <i class="fas fa-shopping-cart" />
            Upload Items
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn"
            onClick={this.showitems}
          >
            <i class="fas fa-hamburger" />
            View/Edit Item list
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn"
            onClick={this.listOfuser}
          >
            <i class="fas fa-users" />
            List of user
          </button>

          <button className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn">
            <i class="fas fa-comments" />
            <Link to="/sellerallreview">All reviews</Link>
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn"
            onClick={this.listOfuser}
          >
            <i class="fas fa-robot" />
            Manage SkyNet
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn"
            onClick={this.listOfuser}
          >
            <i class="fas fa-cog" />
            Settings
          </button>
          <button
            className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow settingsbtn"
            onClick={this.listOfuser}
          >
            <i class="fas fa-question" />
            Support
          </button>
        </div>
        <div className="miscdiv">
          <div className="miscdiv2">
            <article className="center mw5 mw6-ns br3 ba b--black-10 mv4 artcle">
              <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                Shop Detail
              </h1>
              {/* <ReactMap className="mapclass" /> */}
              <img src="/maps.png" />

              <div className="pa3 bt b--black-10">
                <p className="f6 f5-ns lh-copy measure stylepara">
                  <span>Street: {this.state.sellerdetails.street}</span>
                  <span>Apartment No: {this.state.sellerdetails.apt}</span>
                  <span>Postal:{this.state.sellerdetails.postal}</span>
                  <span>Phone No:{this.state.sellerdetails.phone}</span>
                  <span>Shop Name : {this.state.sellerdetails.shopname}</span>
                </p>
              </div>
            </article>
          </div>
        </div>
        <Sky_net />
        <div className="footers1">
          <img src={footer} alt="footer1" />
        </div>
        {this.state.showitems ? <EditSellerItems /> : null}
        {this.state.uploaditems ? (
          <UploadItem onClose={this.closeUploaditems} />
        ) : null}
        {this.state.shopdetails ? (
          <Shoppopup onClose={this.closeshopdetails} />
        ) : null}
        {this.state.userlist ? <Userlist /> : null}
        {/* {this.state.allreview ? <Allreviews /> : null} */}
      </div>
    );
  }
}
