import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../store.js";
import checkUserSession from  '../login/CheckUserSession'
import "./cart.scss";
// import "./style.css";

class UnConnectedCart extends React.Component {
  componentDidMount = () => {
    updateCartInfo();
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
          checkUserSession()
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
          checkUserSession()
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
          checkUserSession()
        }
      });
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
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
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
          <h4>Your Items:</h4>
          {clearButton}
          {this.props.items.map(item => {
            return (
              <div key={item.cartItemId} className="item-cell-width">
                <div className="item-in-column">
                  <div className="image-wrapper">
                    <Link to={"/items/item/" + item.itemId}>
                      <img className="item-image" src={item.itemImage} alt="" />
                    </Link>
                  </div>
                  <div className="information-in-row name-price-width">
                    <div>
                      <div>Name: {item.itemName}</div>
                      <hr />
                      <div className="stick_bottom">${item.itemPrice}</div>
                    </div>
                  </div>
                  <div className="parent quantity-width">
                    <div className="stick_bottom">
                      Qty:{" "}
                      <input
                        className="input-number"
                        type="number"
                        value={item.itemQuantity}
                        id={item.cartItemId}
                        onChange={this.onChangeHandleQuantity}
                      />
                    </div>
                  </div>
                  <div className="parent subtotal-width">
                    <div className="stick_bottom subtotal">
                      Subtotal:{" "}
                      {(parseFloat(item.itemPrice) * item.itemQuantity).toFixed(
                        2
                      )}
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
                <hr />
              </div>
            );
          })}
          <div className="total">Total: {total.toFixed(2)}</div>
          <div className="parent-horizontal">
            <div className="button-right">
              <Link to="/checkout">
                <button
                  className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
                  // onClick={this.onClickChaeckout}
                >
                  Checkout
                </button>
              </Link>
            </div>
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
