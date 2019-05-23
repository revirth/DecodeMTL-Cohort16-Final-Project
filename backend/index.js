// require("dotenv-expand")(require("dotenv").config());
const express = require("express");
const app = express();
const upload = require("multer")({
  dest: __dirname + "/uploads/"
});
app.use("/images", express.static("uploads"));
app.use(upload.none());

// let nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SENDER,
//     pass: process.env.SENDER_PASSWORD
//   }
// });

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded

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
      SESSIONS[req.cookies.sid],
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
    res.locals.CART = CART;

    res.locals.USERNAME = SESSIONS[req.cookies.sid];

    next();
  });

  // routers
  const itemRouter = require("./routes/items");
  const reviewRouter = require("./routes/reviews");
  const chargeRouter = require("./routes/charges");
  const cartRouter = require("./routes/cart");
  const authRouter = require("./routes/auth");

  app.use("/items", itemRouter);
  app.use("/reviews", reviewRouter);
  app.use("/charges", chargeRouter);
  app.use("/cart", cartRouter);
  app.use("/auth", authRouter);

  // start express server
  app.listen(4000, () => console.log("listening on port 4000"));
});

app.get("/users", async (req, res) => {
  process.env.NODE_ENV === "development" &&
    res.send(await USERS.find({}).toArray());
});
