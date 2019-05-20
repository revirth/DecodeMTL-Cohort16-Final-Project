import { createStore, applyMiddleware, compose } from "redux";

let reducer = (state, action) => {
  switch (action.type) {
    case "FillCart":
      return {
        ...state,
        cartItems: action.cartItems
      };
    case "ChangePage":
      return { ...state };
    case "CheckIfUserValid":
      return { ...state, loggedIn: action.isValidUser };
    case "afterLogin":
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        usertype: action.usertype
      };
    case "afterLogout":
      return {
        ...state,
        cartItems: [],
        loggedIn: false,
        username: "",
        usertype: ""
      };
    // case ON_MESSAGE:
    //   return { ...state, msg: [...state.msg, action.payload] };
  }
  return state;
};

let getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
};

let store = createStore(
  reducer,
  {
    cartItems: [],
    loggedIn: false,
    username: getCookie("sid") !== "" ? getCookie("unm") : "",
    usertype: getCookie("sid") !== "" ? getCookie("utp") : ""
  },

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
