import React, { Component } from "react";
import "./custom.css";
import "./style.css";
import Shoppopup from "./updateshoppopup.jsx";
import UploadItem from "./uploadItem.jsx";
import EditItem from "./EditItem.jsx";
// import Addresspopup from "./updateAddresspopup.jsx";
// import Paymentpopup from "./updatePaymentpopup.jsx";
// import Accountdetails from "./updateAccountdetails.jsx"

export default class EditSellerItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount = async () => {
    let fetchUrl = `/items?limit=1000`;
    let response = await fetch(fetchUrl, {
      method: "GET",
      credentials: "include"
    });
    let data = await response.json();

    this.setState({ items: data.items });

    console.table(data);
  };

  render() {
    // let checkAdd = this.state.address ? {<SignupForm>} : null
    return (
      <div className="overlay">
        <div className="w3-animate-bottom editlist">
          <div className="center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 w3-animate-bottom hideop">
            {this.state.items.map((item, i) => (
              <EditItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
