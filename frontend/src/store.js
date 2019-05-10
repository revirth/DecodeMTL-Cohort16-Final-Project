import {
  createStore
} from "redux";

let reducer = (state, action) => {
  /*if (action.type === "ChangeQuantity") {
    return {
      ...state,
      cartItems: state.cartItems.map(item => {
        if (item.itemId === action.itemId) {
          return {
            ...item,
            itemQuantity: parseInt(action.quantity)
          }
        } else {
          return item
        }
      })
    };
  }*/

  /* if (action.type === "RemoveItem") {
     let newItems = state.cartItems.filter( item => {
       return item.itemId !== action.itemId
     })
     return {...state, cartItems: newItems}
   }*/

  if (action.type === "FillCart") {
    return {
      ...state,
      cartItems: action.cartItems
    }
  }

  return state;
}



let store = createStore(
  reducer, {
    cartItems: [],
    login: false,
    username: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;