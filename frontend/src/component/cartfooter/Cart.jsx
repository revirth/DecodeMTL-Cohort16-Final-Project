import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../store.js";
import checkUserSession from "../login/CheckUserSession";
import "./cart.scss";
// import "./style.css";
import Checkout from "../checkout/index.jsx";

class UnConnectedCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: false
    };
  }
  componentDidMount = () => {
    document.addEventListener("keydown", this.escFunction, false);
    updateCartInfo();
  };
  escFunction = event => {
    //console.log("event key", event.key);
    if (event.keyCode === 27) {
      this.setState({
        checkout: false
      });
    }
  };

  onChangeHandleQuantity = e => {
    // if a customer changed the quantity of an item in their Cart
    // we send a request to the endpoint "/cart/updateItem" to update the item
    let data = new FormData();
    data.append("cartItemId", e.target.id);
    data.append("itemQuantity", e.target.value);
    let status = -1;
    fetch("/cart/updateItem", {
      method: "PUT",
      credentials: "include",
      body: data
    })
      .then(headers => {
        status = headers.status;
        return headers.text();
      })
      .then(body => {
        let result = JSON.parse(body);
        if (status === 200) {
          if (result.successful) {
            updateCartInfo();
          }
        } else {
          alert("Error code: " + status + " " + result);
          checkUserSession();
        }
      });
  };

  onClickRemoveItem = e => {
    // if a customer removed an item from their Cart
    // we send a request to the endpoint "/cart/deleteItem" to remove the item
    let data = new FormData();
    data.append("cartItemId", e.target.id);
    let status = -1;
    fetch("/cart/deleteItem", {
      method: "DELETE",
      credentials: "include",
      body: data
    })
      .then(headers => {
        status = headers.status;
        return headers.text();
      })
      .then(body => {
        let result = JSON.parse(body);
        if (status === 200) {
          if (result.successful) {
            updateCartInfo();
          }
        } else {
          alert("Error code: " + status + " " + result);
          checkUserSession();
        }
      });
  };

  onClickClearCart = e => {
    let status = -1;
    fetch("/cart/clear", { method: "DELETE", credentials: "include" })
      .then(headers => {
        status = headers.status;
        return headers.text();
      })
      .then(body => {
        let result = JSON.parse(body);
        if (status === 200) {
          if (result.successful) {
            updateCartInfo();
          }
        } else {
          alert("Error code: " + status + " " + result);
          checkUserSession();
        }
      });
  };
  checkOut = event => {
    this.setState({ checkout: true });
  };

  render() {
    //calculate Total for all items in the Cart
    console.log("Render Cart");
    let total = 0;
    let clearButton =
      this.props.items.length > 0 ? (
        <div className="parent-horizontal">
          <div className="button-right">
            <button
              className="f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow"
              onClick={this.onClickClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : null;
    this.props.items.forEach(item => {
      total = total + parseFloat(item.itemPrice) * parseInt(item.itemQuantity);
    });
    return (
      // generate Cart page
      <div className="cart">
        <div className="general-margin">
          <div className="title-text">Your Items:</div>
          {clearButton}
          {this.props.items.map(item => {
            return (
              <article className=" br3 pa3 pa4-ns mv3 ba b--black-10">
                <div key={item.cartItemId} className="item-cell-width">
                  <div className="item-in-column">
                    <div className="image-wrapper">
                      <Link to={"/items/item/" + item.itemId}>
                        <img
                          className="item-image"
                          src={item.itemImage}
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      </Link>
                    </div>
                    <div className="information-in-row name-price-width">
                      <div>
                        <div className="item-name">{item.itemName}</div>
                        <hr />
                        <div>
                          <div className="price mt2">${item.itemPrice}</div>
                          <div className="mt1">
                            <div className="pr ib1 fs1">Qty: </div>
                            <input
                              className="quantity-box"
                              type="number"
                              value={item.itemQuantity}
                              id={item.cartItemId}
                              onChange={this.onChangeHandleQuantity}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="parent quantity-width">
                    <div className="stick_bottom">
                      <div className="pr ib1 fs1">Qty:{" "}</div>
                      <input
                        className="quantity-box"
                        type="number"
                        value={item.itemQuantity}
                        id={item.cartItemId}
                        onChange={this.onChangeHandleQuantity}
                      />
                    </div>
                  </div> */}
                    <div className="parent subtotal-width">
                      <div className="stick_bottom subtotal">
                        Subtotal:{"  $"}
                        {(
                          parseFloat(item.itemPrice) * item.itemQuantity
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div className="remove-width">
                      <i
                        className="fa fa-times"
                        id={item.cartItemId}
                        onClick={this.onClickRemoveItem}
                      />
                    </div>
                  </div>
                  {/* <hr /> */}
                </div>
              </article>
            );
          })}
          <div className="total">
            Total:{"  $"}
            {total.toFixed(2)}
          </div>
          <div className="parent-horizontal">
            <div className="button-right">
              {/* <Link to="/checkout"> */}
              <button
                className="f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow"
                onClick={this.checkOut}
              >
                Checkout
              </button>
              {/* </Link> */}
            </div>
            {this.state.checkout ? (
              <Checkout onClose={this.closePayment} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

let updateCartInfo = () => {
  // we send a request to the endpoint "/cartItems" to upload cartItems for current user
  // before show the Cart page the first time
  fetch("/cart/allItems", { method: "GET", credentials: "include" })
    .then(headers => {
      return headers.text();
    })
    .then(body => {
      // we update the cartItems for current user in our "store"
      let parsed = JSON.parse(body);
      if (parsed.successful) {
        store.dispatch({ type: "FillCart", cartItems: parsed.cartItems });
      }
    });
};

let mapStateToProps = state => {
  return { items: state.cartItems };
};

let Cart = connect(mapStateToProps)(UnConnectedCart);

export default Cart;

export { updateCartInfo };
