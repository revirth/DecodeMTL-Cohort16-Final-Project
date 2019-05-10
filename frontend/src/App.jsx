import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Cart from "./component/cartfooter/Cart";
import CartBar from "./component/cartfooter/CartBar";
import itemList from "./component/itemlist/index";
import Navbar from "./component/navbar/reactnavbar";
import Itempage from "./component/itemlist/itempage.jsx";
import HomePageContent from "./component/homepagecontent/HomePageContent.jsx";
import Checkout from "./component/checkout/index";

let renderItem = routerData => {
  return (
    <div>
      <Itempage id={routerData.match.params.itemId} />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* TODO: pass state.login  */}
      <div>
        <Route exact={true} path="/" component={HomePageContent} />
        <Route exact={true} path="/items" component={itemList} />
        <Route exact={true} path="/cart" component={Cart} />
        <Route exact={true} path="/items/:itemId" render={renderItem} />
        <Route exact={true} path="/checkout" component={Checkout} />
      </div>
      <CartBar />
    </BrowserRouter>
  );
}

export default App;
