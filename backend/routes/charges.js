const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  let sid = req.cookies.sid;
  let username = res.locals.SESSIONS[sid];

  if (username === undefined) {
    res.send(resmsg(false, "Invalid User"));
    return;
  }

  try {
    const charge = await stripe.charges.create({
      amount: parseInt(req.body.amount),
      currency: "cad",
      description: "An example charge",
      source: req.body.token,
      metadata: { unm: username }
    });

    console.log("TCL: /chargse -> ", charge);

    await res.locals.ORDERS.insertOne(charge);

    res.send(resmsg(true));
  } catch (err) {
    console.error("TCL: /charges -> ", err);

    res.status(500).send(resmsg(false, err));
  }
});

router.get("/", async (req, res) => {
  let list = await stripe.charges.list();

  res.json(list);
});

module.exports = router;
