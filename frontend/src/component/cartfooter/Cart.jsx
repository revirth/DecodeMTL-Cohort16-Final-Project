import React from "react";
import { connect } from "react-redux";
import "./cart.scss";
import "./style.css";

class UnConnectedCart extends React.Component {

  componentDidMount = () => {
    // we send a request to the endpoint "/cartItems" to upload cartItems for current user
    // before show the Cart page the first time
    fetch("http://localhost:4000/cartItems", { method: "GET" })
      .then(headers => {
        return headers.text();
      })
      .then(body => {
        // we update the cartItems for current user in our "store"
        this.props.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
      });
  }

  onChangeHandleQuantity = e => {
    // if a customer changed the quantity of an item in their Cart
    // we send a request to the endpoint "/updateCartItem" to update the item 
    let data = new FormData()
    data.append("cartItemId", e.target.id)
    data.append("itemQuantity", e.target.value)
    fetch("http://localhost:3000/updateCartItem", { method: "PUT", body: data }).then(headers => {
      console.log("PUT")
      return headers.text()
    }).then(body => {
      let result = true
      if (result) {
        // if the item was updated successfully we send request to the endpoint "/cartItems"
        // to upload updated cartItems for current user
        fetch("http://localhost:4000/cartItems", { method: "GET" }).then(headers => {
          return headers.text();
        }).then(body => {
          // we update the cartItems for current user in our "store"
          this.props.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
        })
      }
    })
  };

  onClickRemoveItem = e => {
    // if a customer removed an item from their Cart
    // we send a request to the endpoint "/deleteCartItem" to remove the item 
    let data = new FormData()
    data.append("cartItemId", e.target.id)
    fetch("http://localhost:3000/deleteCartItem", { method: "DELETE", body: data }).then(headers => {
      console.log("Delete")
      return headers.text()
    }).then(body => {
      let result = true
      if (result) {
        // if the item was removed successfully we send request to the endpoint "/cartItems"
        // to upload updated cartItems for current user
        fetch("http://localhost:4000/cartItems", { method: "GET" }).then(headers => {
          return headers.text();
        }).then(body => {
          // we update the cartItems for current user in our "store"
          this.props.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
        })
      }
    })
  };

  render() {
    //calculate Total for all items in the Cart
    let total = 0;
    this.props.items.forEach(item => {
      total = total + parseFloat(item.itemPrice) * parseInt(item.itemQuantity);
    });
    return (
      // generate Cart page
      <div className="cart">
        <div className="general-margin">
          <h4>Your Items:</h4>
          {this.props.items.map((item) => {
            return (
              <div key={item.cartItemId} className="item-cell-width">
                <div className="item-in-column">
                  <div className="image photo-width">
                    <img src={item.itemImage} height="150px" width="150px" alt="" />
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
              <button
                 className="checkout-button f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow"
                onClick={this.onClickHandle}
              >
                Checkout
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { items: state.cartItems };
};

let Cart = connect(mapStateToProps)(UnConnectedCart);

export default Cart;
