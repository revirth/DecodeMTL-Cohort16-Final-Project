import React from "react";
import { connect } from "react-redux";
import "./cart.css";
import "./style.css";

class UnConnectedCart extends React.Component {

  componentDidMount = () => {
    fetch("http://localhost:4000/cartItems", { method: "GET" })
    .then(headers => {
      return headers.text();
    })
    .then(body => {
      this.props.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
    });
  }
  
  onChangeHandleQuantity = e => {

    let data = new FormData()
    data.append("cartItemId", e.target.id )
    data.append("itemQuantity", e.target.value)
    fetch("http://localhost:3000/updateCartItem", { method: "PUT", body: data}).then( headers => {
      console.log("PUT")
      return headers.text()
    }).then( body => {
      let result = true
      if(result){
        fetch("http://localhost:4000/cartItems", { method: "GET" }).then(headers => {
           return headers.text();
                                                                                    }).then(body => {
    this.props.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
                                                                                                    })
      }
    })

   /* this.props.dispatch({
      type: "ChangeQuantity",
      itemId: e.target.id,
      quantity: e.target.value
    });*/

  
  };

  onClickRemoveItem = e => {
    let data = new FormData()
    data.append("cartItemId", e.target.id )
    fetch("http://localhost:3000/deleteCartItem", { method: "DELETE", body: data}).then( headers => {
      console.log("Delete")
      return headers.text()
    }).then( body => {
      let result = true
      if(result){
        fetch("http://localhost:4000/cartItems", { method: "GET" }).then(headers => {
           return headers.text();
                                                                                    }).then(body => {
    this.props.dispatch({ type: "FillCart", cartItems: JSON.parse(body) });
                                                                                                    })
      }
    })
  };

  render() {
    let total = 0;
    this.props.items.forEach(item => {
      total = total + parseFloat(item.itemPrice) * parseInt(item.itemQuantity);
    });
    return (
      <div className="general-margin">
        <h4>Your Items:</h4>
        {this.props.items.map((item) => {
          return (
            <div key={item.cartItemId} className="item-cell-width">
              <div className="item-in-column">
                <div className="image photo-width">
                  <img src={item.itemImage} height="150px" width= "150px" alt="" />
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
    );
  }
}

let mapStateToProps = state => {
  return { items: state.cartItems };
};

let Cart = connect(mapStateToProps)(UnConnectedCart);

export default Cart;
