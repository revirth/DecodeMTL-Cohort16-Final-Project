import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "FillCart") {
    return {
      ...state,
      cartItems: action.cartItems
    };
  }

  if (action.type === "ChangePage") {
    return { ...state };
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

let isValidUser = async () => {
  let response = await fetch("/auth/isvalid", { credentials: "include" });
  let data = await response.json();

  return data.status;
};

let store = createStore(
  reducer,
  {
    cartItems: [],
    loggedIn: isValidUser() === true,
    username: getCookie("sid") !== "" ? getCookie("unm") : "",
    usertype: getCookie("sid") !== "" ? getCookie("utp") : ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
