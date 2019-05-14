import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "FillCart") {
    return {
      ...state,
      cartItems: action.cartItems
    };
  }

  if (action.type === "ChangePage"){
    return { ...state}
  }

  switch (action.type) {
    case "afterLogin":
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        usertype: action.usertype
      };
    case "afterLogout":
      return { ...state, cartItems: [], loggedIn: false, username: "" };
  }
  return state;
};

let getCookie_sid = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)sid\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};
let getCookie_utp = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)utp\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

let getCookie_unm = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)unm\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

let store = createStore(
  reducer,
  {
    cartItems: [],
    loggedIn: getCookie_sid() !== "",
    username: getCookie_unm(),
    usertype: getCookie_utp()
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
