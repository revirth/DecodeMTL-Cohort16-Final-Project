import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./cartBar.scss";
//import "./style.css";

class UnconnectedCartBar extends React.Component {
  componentDidMount = () => {
    // we send a request to the endpoint "/cartItems" to upload cartItems for current user
    // before show the CartBar the first time
    fetch("http://localhost:4000/cartItems", { method: "GET", credentials:'include' })
      .then(headers => {
        return headers.text();
      })
      .then(body => {
        // we update the cartItems for current user in our "store"
        this.props.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
      });
  }

  render() {
    return (
      // generate CartBar page
      <div className="cartBar">
        <div className="footer row">
          <div className="equal-width" />
          <div className="equal-width wrapper-center">
            <div className="child-center">
              <div className="column text-title">Cart :</div>
              <div className="column number"> {this.props.number}</div>
              <div className="column">
                <div className="height100">
                  <img
                    src="https://image.flaticon.com/icons/svg/60/60992.svg"
                    height="15px"
                    alt=""
                  />
                </div>
                <div className="text">items</div>
              </div>
            </div>
          </div>
          <div className="column equal-width wrapper-center">
            <div className="child-center">
              <div className="column text-title">Total: </div>
              <div className="column number">${this.props.total.toFixed(2)}</div>
            </div>
          </div>
          <div className="column equal-width wrapper-center">
            <div className="child-center">
              <Link to="/cart/">
                <button className="view-cart-button" onClick={this.onClickHandle}>
                  View Cart
              </button>
              </Link>
            </div>
          </div>
          <div className="equal-width" />
        </div>
      </div>
    );
  }
}

let mapStatetoProps = state => {
  let numberOfItems = 0;
  let totalPrice = 0;
  // calculate the Number of items in the Cart and the Total for all items
  state.cartItems.forEach(item => {
    totalPrice =
      totalPrice + parseFloat(item.itemPrice) * parseInt(item.itemQuantity);
    numberOfItems = numberOfItems + parseInt(item.itemQuantity);
  });
  return { number: numberOfItems, total: totalPrice };
};

let CartBar = connect(mapStatetoProps)(UnconnectedCartBar);

export default CartBar;
