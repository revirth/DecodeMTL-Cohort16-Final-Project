const express = require("express");
const app = express();
const upload = require("multer")({
  dest: __dirname + "/uploads/"
});
app.use("/images", express.static("uploads"));
app.use(upload.none());

let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'consomater@gmail.com',
    pass:  '123QWEqwe'
   }
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: `https://localhost:3000`
  })
);

const morgan = require("morgan");
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      JSON.stringify(req.body),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms"
    ].join(" ");
  })
);

const shajs = require("sha.js");
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

  // register variable for passing to router
  app.use((req, res, next) => {
    res.locals.SESSIONS = SESSIONS;
    res.locals.USERS = USERS;
    res.locals.ITEMS = ITEMS;
    res.locals.REVIEWS = REVIEWS;
    res.locals.ORDERS = ORDERS;

    next();
  });

  // routers
  const itemRouter = require("./routes/items");
  const reviewRouter = require("./routes/reviews");
  const chargeRouter = require("./routes/charges");

  app.use("/items", itemRouter);
  app.use("/reviews", reviewRouter);
  app.use("/charges", chargeRouter);

  // start express server
  app.listen(4000, () => console.log("listening on port 4000"));
});

app.get("/users", async (req, res) => {
  process.env.NODE_ENV === "development" &&
    res.send(await USERS.find({}).toArray());
});

app.get("/user/isvalid", async (req, res) => {
  if (SESSIONS[req.cookies.sid] !== undefined) {
    res.send(resmsg(true));
    return;
  }

  res.clearCookie("sid");
  res.send(resmsg(false));
});

app.post("/login", async (req, res) => {
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

/**Facebook/Google login */
app.post("/socialLogin", async (req, res) => {
  console.log("Body: ", req.body)
  let query = { userId: req.body.userId };

  // find a user in Mongo
  let doc = await USERS.findOne(query);
  console.log("TCL: /facebookLogin -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    res.send(resmsg(false, "User doesn't exist"));
    return;
  }
  // login
  let sid = "" + Math.floor(Math.random() * 1000000000000);
  SESSIONS[sid] = doc.username;
  res.cookie("sid", sid);
  res.cookie("unm", doc.username);
  res.cookie("utp", doc.usertype);
  res.send({
    status: true,
    message: "facebookLogin successful",
    username: doc.username
  });
});

app.get("/logout", (req, res) => {
  const sid = req.cookies.sid;
  delete SESSIONS[sid];
  res.clearCookie("sid");
  res.send(resmsg(true, "logout success"));
});

app.post("/signup", async (req, res) => {
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

/**Facebook/Google SignUp */
app.post("/socialSignup", async (req, res) => {
  let userId = req.body.userId ? req.body.userId : -1
  let username = req.body.username;
  let usertype = req.body.usertype;
  let signuptype = req.body.signuptype;

  // check the username
  let doc = await USERS.findOne({
    userId: userId
  });
  console.log("TCL: /facebookSignup -> USERS.findOne", doc);

  if (doc !== null) {
    res.send(resmsg(false, "Username is already used"));
    return;
  }

  // store userinfo in Mongo
  let obj = {
    userId: userId,
    username: username,
    usertype: parseInt(usertype),
    signuptype: parseInt(signuptype)
  };

  await USERS.insertOne(obj);
  console.log("/facebookSignUp user is added");
  res.send(resmsg(true, "signup success"));
});

/**return an array of items (each item is an object) in the Cart for current user*/
app.get("/cartItems", async (req, res) => {
  let sid = req.cookies.sid;
  let username = SESSIONS[sid];
  //check if there is a session for current user
  if (username !== undefined) {
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
app.post("/addCartItem", async (req, res) => {
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
app.delete("/deleteCartItem", async (req, res) => {
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
app.delete("/clearCart", async (req, res) => {
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
app.put("/updateCartItem", async (req, res) => {
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

app.get("/profile", async (req, res) => {
  let sid = req.cookies.sid;
  let username = SESSIONS[sid];

  // find a user in Mongo
  let doc = await USERS.findOne({ username: username });
  console.log("TCL: /profile -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    res.send(resmsg(false, "Invalid request"));
    return;
  }

  delete doc.password;

  res.send(doc);
});

app.put("/profile", async (req, res) => {
  let sid = req.cookies.sid;
  let username = SESSIONS[sid];

  // find a user in Mongo
  let doc = await USERS.findOne({ username: username });
  console.log("TCL: /profile -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    res.send(resmsg(false, "Invalid request"));
    return;
  }

  let body = req.body.password
    ? { ...req.body, password: sha256(req.body.password) }
    : { ...req.body };

  doc = await USERS.findOneAndUpdate(
    { _id: ObjectId(doc._id) },
    { $set: body },
    { returnNewDocument: true }
  );

  console.log("TCL: /profile -> USERS.findOneAndUpdate", doc);

  doc["ok"] && res.send(resmsg(true, "user profile updated"));
});

/**sending a temporary password to the user */
app.post("/sendpassword", async (req,res) => {
  let userEmailAddress = req.body.email
  
  let doc = await USERS.findOne({email: userEmailAddress})
  
  if(doc === null){
    console.log("Email doesn't exist")
    res.send(JSON.stringify({status: false, message: "Email doesnt exist"}))
    return
  }
  
  let randomPassword = Math.random().toString(36).slice(-8);

  await USERS.updateOne(
    { _id: doc._id },
    { $set: { password: sha256(randomPassword) } },
    function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " password was updated");
    }
  );

  let mailOptions = {
    from: 'consomater@gmail.com',
    to: userEmailAddress,
    subject: 'Reset password',
    text: 'Your temporary password is : ' + randomPassword
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send(JSON.stringify({status: true, message: "Password sent. Please check your email"} ))

})
