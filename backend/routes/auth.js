const express = require("express");
const router = express.Router();
require("dotenv-expand")(require("dotenv").config());
const ObjectId = require("mongodb").ObjectId;
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const accountSid = "ACa40838c98b0bb1e79ee3d893936297fa";
const authToken = "81d861e95f049d1bbe053d0cc1c79ff1";
const client = new twilio(accountSid, authToken);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER,
    pass: process.env.SENDER_PASSWORD
  }
});
const Joi = require("@hapi/joi");

const validateUser = user => {
  const schema = {
    username: Joi.string()
      .alphanum()
      .required(),
    password: Joi.string().required(),
    signuptype: Joi.string(),
    usertype: Joi.string()
  };
  console.log("schema: ", Joi.validate(user, schema));
  return Joi.validate(user, schema);
};

router.get("/isvalid", async (req, res) => {
  if (res.locals.USERNAME) return res.send(resmsg(true));

  res.clearCookie("sid");
  res.status(400).send(resmsg(false));
});

router.post("/login", async (req, res) => {
  // validate form data
  const { error } = validateUser(req.body);
  if (error)
    return res.status(400).send(resmsg(false, error.details[0].message));

  let query = {
    ...req.body,
    password: sha256(req.body.password)
  };

  // find a user in Mongo
  let doc = await res.locals.USERS.findOne(query);
  console.log("TCL: /login -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    return res
      .status(400)
      .send(resmsg(false, "Username or password is invalid"));
  }

  // login
  let sid = "" + Math.floor(Math.random() * 1000000000000);
  res.locals.SESSIONS[sid] = req.body.username;
  res.cookie("sid", sid);
  res.cookie("unm", req.body.username);
  res.cookie("utp", doc.usertype);
  res.send(resmsg(true, "login success"));
});

router.get("/logout", (req, res) => {
  const sid = req.cookies.sid;
  delete res.locals.SESSIONS[sid];
  res.clearCookie("sid");
  res.send(resmsg(true, "logout success"));
});
sendtext = (to, message) => {
  console.log("sending text to:", to, "message:", message);
  client.messages
    .create({
      body: message,
      to: to,
      from: "+14387963072"
    })
    .then(message => console.log(message.sid));
};

router.post("/signup", async (req, res) => {
  // validate form data
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error)
    return res.status(400).send(resmsg(false, error.details[0].message));

  // check the username
  let doc = await res.locals.USERS.findOne({
    username: req.body.username
  });

  console.log("TCL: /signup -> USERS.findOne", doc);

  if (doc !== null)
    return res.status(400).send(resmsg(false, "Username is already used"));

  // store userinfo in Mongo
  let obj = {
    ...req.body,
    password: sha256(req.body.password),
    usertype: parseInt(req.body.usertype)
  };

  await res.locals.USERS.insertOne(obj);
  Number.isInteger(+obj.username) &&
    sendtext(
      +obj.username,
      "Welcome to Nutrition Fine Fourchette http://google.com"
    );
  res.send(resmsg(true, "signup success"));
});

router.get("/profile", async (req, res) => {
  let sid = req.cookies.sid;
  let username = res.locals.SESSIONS[sid];

  // find a user in Mongo
  let doc = await res.locals.USERS.findOne({ username: username });
  console.log("TCL: /profile -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    return res.status(400).send(resmsg(false, "Invalid request"));
  }

  delete doc.password;

  res.send(doc);
});

router.put("/profile", async (req, res) => {
  let sid = req.cookies.sid;
  let username = res.locals.SESSIONS[sid];
  console.log("Username: ", username);

  // find a user in Mongo
  let doc = await res.locals.USERS.findOne({ username: username });
  console.log("TCL: /profile -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    return res.status(400).send(resmsg(false, "Invalid request"));
  }

  let body = req.body.password
    ? { ...req.body, password: sha256(req.body.password) }
    : { ...req.body };

  doc = await res.locals.USERS.findOneAndUpdate(
    { _id: ObjectId(doc._id) },
    { $set: body },
    { returnNewDocument: true }
  );

  console.log("TCL: /profile -> USERS.findOneAndUpdate", doc);

  doc["ok"] && res.send(resmsg(true, "user profile updated"));
});

/**Facebook/Google login */
router.post("/socialLogin", async (req, res) => {
  console.log("Body: ", req.body);
  let query = { userId: req.body.userId };

  // find a user in Mongo
  let doc = await res.locals.USERS.findOne(query);
  console.log("TCL: /facebookLogin -> USERS.findOne", doc);

  if (doc === null) {
    res.clearCookie("sid");
    return res.send(resmsg(false, "User doesn't exist"));
  }
  // login
  let sid = "" + Math.floor(Math.random() * 1000000000000);
  res.locals.SESSIONS[sid] = doc.username;
  res.cookie("sid", sid);
  res.cookie("unm", doc.username);
  res.cookie("utp", doc.usertype);
  res.send({
    status: true,
    message: "facebookLogin successful",
    username: doc.username
  });
});

/**Facebook/Google SignUp */
router.post("/socialSignup", async (req, res) => {
  let userId = req.body.userId ? req.body.userId : -1;
  let username = req.body.username;
  let usertype = req.body.usertype;
  let signuptype = req.body.signuptype;

  // check the username
  let doc = await res.locals.USERS.findOne({
    userId: userId
  });
  console.log("TCL: /facebookSignup -> USERS.findOne", doc);

  if (doc !== null) return res.send(resmsg(false, "Username is already used"));

  // store userinfo in Mongo
  let obj = {
    userId: userId,
    username: username,
    usertype: parseInt(usertype),
    signuptype: parseInt(signuptype)
  };

  await res.locals.USERS.insertOne(obj);
  console.log("/facebookSignUp user is added");
  res.send(resmsg(true, "signup success"));
});

/**sending a temporary password to the user */
router.post("/sendpassword", async (req, res) => {
  let userEmailAddress = req.body.email;

  let doc = await res.locals.USERS.findOne({ email: userEmailAddress });

  if (doc === null) {
    console.log("Email doesn't exist");
    res.send(JSON.stringify({ status: false, message: "Email doesnt exist" }));
    return;
  }

  let randomPassword = Math.random()
    .toString(36)
    .slice(-8);

  await res.locals.USERS.updateOne(
    { _id: doc._id },
    { $set: { password: sha256(randomPassword) } },
    function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " password was updated");
    }
  );

  let mailOptions = {
    from: "consomater@gmail.com",
    to: userEmailAddress,
    subject: "Reset password",
    text: "Your temporary password is : " + randomPassword
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send(
    JSON.stringify({
      status: true,
      message: "Password sent. Please check your email"
    })
  );
});

module.exports = router;
