import { createStore, applyMiddleware, compose } from "redux";
import { ApiAiClient } from "api-ai-javascript";
const accessToken = "5fa6f64523ef4168b443821a34096c76";
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = "ON_MESSAGE";

export const sendMessage = (text, sender = "user") => ({
  type: ON_MESSAGE,
  payload: { text, sender }
});

const messageMiddleware = () => next => action => {
  next(action);
  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;
    client.textRequest(text).then(onSuccess);

    function onSuccess(response) {
      const {
        queryResult: { queryText }
      } = response;
      next(sendMessage(queryText, "jarvis"));
    }
  }
};

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

  if (action.type === "CheckIfUserValid") {
    return { ...state, loggedIn: action.isValidUser };
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
      return {
        ...state,
        cartItems: [],
        loggedIn: false,
        username: "",
        usertype: ""
      };
    case ON_MESSAGE:
      return { ...state, msg: action.payload };
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
    // loggedIn: isValidUser() === true,
    loggedIn: false,
    username: getCookie("sid") !== "" ? getCookie("unm") : "",
    usertype: getCookie("sid") !== "" ? getCookie("utp") : "",
    msg: [{ text: "hey" }]
  },
  compose(
    applyMiddleware(messageMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
