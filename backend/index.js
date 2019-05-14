let express = require("express");
let app = express();
let upload = require("multer")({
  dest: __dirname + "/uploads/"
});
app.use("/images", express.static("uploads"));

let cookieParser = require("cookie-parser");
app.use(cookieParser());

let cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:3000`
  })
);

let shajs = require("sha.js");
sha256 = str =>
  shajs("sha256")
    .update(str)
    .digest("hex");

resmsg = (st, msg) => ({
  status: st,
  message: msg
});

let SESSIONS = {};

require("dotenv-expand")(require("dotenv").config());
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
let DB, USERS, CONFIG, ITEMS, REVIEWS, ORDERS;
MongoClient.connect(process.env.MLAB_URI, {
  useNewUrlParser: true
}).then(client => {
  DB = client.db("alibay");
  USERS = DB.collection("users"); // [{username:'a', password:'sha256...', usertype:1}]
  CONFIG = DB.collection("config"); // usertypes: [type1, type2, type3 ...],
  ITEMS = DB.collection("items");
  REVIEWS = DB.collection("reviews");
  CART = DB.collection("cart");
  ORDERS = DB.collection("orders");

  // in dev environment, check MongoDB documents
  // let arrP = [USERS, CONFIG, ITEMS, REVIEWS, CART].map(p =>
  let arrP = [CONFIG].map(p => p.find({}).toArray());

  process.env.NODE_ENV === "development" &&
    Promise.all(arrP).then(arr => arr.map(res => console.log(res)));

  // start express server
  app.listen(4000, () => console.log("listening on port 4000"));
});

app.get("/users", async (req, res) => {
  process.env.NODE_ENV === "development" &&
    res.send(await USERS.find({}).toArray());
});

app.post("/login", upload.none(), async (req, res) => {
  console.log("TCL: /login", req.body);

  let query = {
    ...req.body,
    password: sha256(req.body.password)
  };

  // find a user in Mongo
  let doc = await USERS.findOne(query);
  console.log("TCL: /login -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    res.send(resmsg(false, "Username or password is invalid"));
    return;
  }

  // login
  let sid = "" + Math.floor(Math.random() * 1000000000000);
  SESSIONS[sid] = req.body.username;
  res.cookie("sid", sid);
  res.cookie("unm", req.body.username);
  res.cookie("utp", doc.usertype);
  res.send(resmsg(true, "login success"));
});

app.get("/logout", upload.none(), (req, res) => {
  console.log("TCL: /logout", req.body);

  const sid = req.cookies.sid;
  delete SESSIONS[sid];
  res.clearCookie("sid");
  res.send(resmsg(true, "logout success"));
});

app.post("/signup", upload.none(), async (req, res) => {
  console.log("TCL: /signup", req.body);

  // check the username
  let doc = await USERS.findOne({
    username: req.body.username
  });
  console.log("TCL: /signup -> USERS.findOne", doc);

  if (doc !== null) {
    res.send(resmsg(false, "Username is already used"));
    return;
  }

  // store userinfo in Mongo
  let obj = {
    ...req.body,
    password: sha256(req.body.password),
    usertype: parseInt(req.body.usertype)
  };

  await USERS.insertOne(obj);
  res.send(resmsg(true, "signup success"));
});

paginzation = query => {
  const limit = query.limit ? parseInt(query.limit) : parseInt(10); // default paging size 10
  const page = query.page ? parseInt(query.page) : 1;
  const skip = page ? (page - 1) * limit : 0;

  return { limit: limit, page: page, skip: skip };
};

app.get("/items", upload.none(), async (req, res) => {
  console.log("TCL: /items", req.query);

  const query = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i"
        }
      }
    : {};

  const page = paginzation(req.query);

  const docs = await ITEMS.find(query)
    .skip(page.skip)
    .limit(page.limit)
    .toArray();

  const data = {
    items: docs,
    page: page.page,
    total: await ITEMS.countDocuments(),
    limit: page.limit
  };

  console.log("TCL: /items", data);

  res.send(data);
});

app.get("/items/:itemId", upload.none(), async (req, res) => {
  console.log("TCL: /items/:itemId", req.params);

  let _id = ObjectId(req.params.itemId);
  let doc = await ITEMS.findOne(_id);

  res.send(doc);
});

app.get("/items/:itemId/reviews", upload.none(), async (req, res) => {
  console.log("TCL: /items/:itemId/reviews", req.params);

  let query = {
    itemId: req.params.itemId
  };
  let docs = await REVIEWS.find(query).toArray();

  res.send(docs);
});

app.post("/items", upload.none(), async (req, res) => {
  console.log("TCL: /items", req.body);

  // store an item in Mongo
  let obj = {
    ...req.body,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity)
  };

  await ITEMS.insertOne(obj);
  res.send(resmsg(true, "item inserted"));
});

app.put("/items/:itemId", upload.none(), async (req, res) => {
  console.log("TCL: /items/:itemId", req.params, req.body);

  let object = {
    ...req.body,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity)
  };

  let doc = await ITEMS.findOneAndUpdate(
    {
      _id: ObjectId(req.params.itemId)
    },
    {
      $set: object
    },
    {
      returnNewDocument: true
    }
  );

  console.log(doc);

  doc["ok"] && res.send(resmsg(true, "item updated"));
});

app.get("/reviews", upload.none(), async (req, res) => {
  console.log("TCL: /reviews", req.body);

  let docs = await REVIEWS.find({}).toArray();

  res.send(docs);
});

app.get("/reviews/:reviewId", upload.none(), async (req, res) => {
  console.log("TCL: /items/:reviewId", req.params);

  let _id = ObjectId(req.params.reviewId);
  let doc = await REVIEWS.findOne(_id);

  res.send(doc);
});

app.post("/reviews", upload.none(), async (req, res) => {
  console.log("TCL: /reviews", req.body);

  // store a review in Mongo
  let obj = {
    ...req.body,
    rating: parseInt(req.body.rating)
  };

  await REVIEWS.insertOne(obj);
  res.send(resmsg(true, "review inserted"));
});

app.put("/reviews/:reviewId", upload.none(), async (req, res) => {
  console.log("TCL: /review/:reviewId", req.params, req.body);

  let object = {
    ...req.body,
    rating: parseInt(req.body.rating)
  };

  let doc = await REVIEWS.findOneAndUpdate(
    {
      _id: ObjectId(req.params.reviewId)
    },
    {
      $set: object
    },
    {
      returnNewDocument: true
    }
  );

  console.log(doc);

  doc["ok"] && res.send(resmsg(true, "review updated"));
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/charge", upload.none(), async (req, res) => {
  let sid = req.cookies.sid;
  let username = SESSIONS[sid];
  if (username === undefined) {
    res.send(resmsg(false, "Invalid User"));
    return;
  }
  console.log("TCL: /charge", req.body, username);

  try {
    const charge = await stripe.charges.create({
      amount: parseInt(req.body.amount),
      currency: "cad",
      description: "An example charge",
      source: req.body.token,
      metadata: { unm: username }
    });

    console.log("TCL: /charge -> ", charge);

    await ORDERS.insertOne(charge);

    res.send(resmsg(true));
  } catch (err) {
    console.error("TCL: /charge -> ", err);

    res.status(500).send(resmsg(false, err));
  }
});

app.get("/charges", async (req, res) => {
  console.log("TCL: /charges");

  let list = await stripe.charges.list();

  res.json(list);
});

/**return an array of items (each item is an object) in the Cart for current user*/
app.get("/cartItems", async (req, res) => {
  let sid = req.cookies.sid;
  //check if there is a session for current user
  if (sid) {
    let username = SESSIONS[sid];
    //request userId from the collection "users"
    let currentUser = await USERS.findOne({ username: username });
    //request the items in the Cart for user with this userId only
    let cart = await CART.find({ userId: currentUser._id }).toArray();
    //request all items from the collection "Items"
    let items = await ITEMS.find({}).toArray();
    //for each item in the Cart create an object for frontend
    let cartItems = cart.map(element => {
      let cartItem = {};
      items.forEach(item => {
        if (ObjectId(item._id).toString() === element.itemId) {
          cartItem = {
            cartItemId: ObjectId(element._id).toString(),
            itemId: ObjectId(item._id).toString(),
            itemName: item.name,
            itemImage: item.imgUrl,
            itemPrice: item.price,
            itemQuantity: element.itemQuantity
          };
        }
      });
      return cartItem;
    });
    console.log("Cart items sent");
    process.env.NODE_ENV === "development" &&
      res.send(JSON.stringify({ successful: true, cartItems: cartItems }));
  } else {
    process.env.NODE_ENV === "development" &&
      res.send(JSON.stringify({ successful: false }));
  }
});

/**add a Cart item to mongoDB*/
app.post("/addCartItem", upload.none(), async (req, res) => {
  let sid = req.cookies.sid;
  //check if a session exists
  if (sid) {
    let username = SESSIONS[sid];
    //get userId of the current user
    let currentUser = await USERS.findOne({ username: username });
    let itemId = req.body.itemId;
    //create a new object for the new item
    let newCartItem = {
      itemId: itemId,
      itemQuantity: 1,
      userId: currentUser._id
    };
    //add this object to the "cart" collection
    await CART.insertOne(newCartItem, function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " cart item added");
      res.send(JSON.stringify({ successful: true }));
    });
  } else {
    res.send(JSON.stringify({ successful: false }));
  }
});

/**delete one Cart Item */
app.delete("/deleteCartItem", upload.none(), async (req, res) => {
  let sid = req.cookies.sid;
  let cartItemId = req.body.cartItemId;
  //check if a session exists
  if (sid) {
    let username = SESSIONS[sid];
    //get a userId of the current user
    let cu = await USERS.findOne({ username: username });
    let currentUser = cu._id;
    //get a userId of the current Cart item
    let ciu = await CART.findOne({ _id: ObjectId(cartItemId) });
    let currentItemUserId = ciu.userId;
    //if that's the same person - remove the item
    if (
      currentUser.toString().localeCompare(currentItemUserId.toString()) === 0
    ) {
      let _id = ObjectId(req.body.cartItemId);
      await CART.deleteOne({ _id: _id }, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " cart item deleted");
        res.send(JSON.stringify({ successful: true }));
      });
    }
  } else {
    res.send(JSON.stringify({ successful: false }));
  }
});

/**clear the Cart of the current user*/
app.delete("/clearCart", upload.none(), async (req, res) => {
  let sid = req.cookies.sid;
  //check if the session exists
  if (sid) {
    let username = SESSIONS[sid];
    //get a userId of the current user
    let currentUser = await USERS.findOne({ username: username });
    //delete all the elements in the Cart
    await CART.deleteMany({ userId: currentUser._id }, function(err, obj) {
      if (err) throw err;
      console.log("Cart cleared");
      res.send(JSON.stringify({ successful: true }));
    });
  } else {
    res.send(JSON.stringify({ successful: false }));
  }
});

/**update the curt item of the current user */
app.put("/updateCartItem", upload.none(), async (req, res) => {
  let sid = req.cookies.sid;
  let cartItemId = req.body.cartItemId;
  // check if a session exists
  if (sid) {
    let username = SESSIONS[sid];
    //get a userId of the current user
    let cu = await USERS.findOne({ username: username });
    let currentUser = cu._id;
    //get a userId of the current Cart item
    let ciu = await CART.findOne({ _id: ObjectId(cartItemId) });
    let currentItemUserId = ciu.userId;
    //if that's the same person - update the item
    if (
      currentUser.toString().localeCompare(currentItemUserId.toString()) === 0
    ) {
      let _id = ObjectId(req.body.cartItemId);
      let quantity = req.body.itemQuantity;
      await CART.updateOne(
        { _id: _id },
        { $set: { itemQuantity: quantity } },
        function(err, obj) {
          if (err) throw err;
          console.log(obj.result.n + " cart item updated");
        }
      );
      res.send(JSON.stringify({ successful: true }));
    }
  } else {
    res.send(JSON.stringify({ successful: false }));
  }
});
