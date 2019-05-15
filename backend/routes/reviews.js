const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.get("/", async (req, res) => {
  let docs = await res.locals.REVIEWS.find({}).toArray();

  res.send(docs);
});

router.get("/:reviewId", async (req, res) => {
  let _id = ObjectId(req.params.reviewId);
  let doc = await res.locals.REVIEWS.findOne(_id);

  res.send(doc);
});

router.post("/", async (req, res) => {
  // store a review in Mongo
  let obj = {
    ...req.body,
    rating: parseInt(req.body.rating)
  };

  await res.locals.REVIEWS.insertOne(obj);
  res.send(resmsg(true, "review inserted"));
});

router.put("/:reviewId", async (req, res) => {
  let object = {
    ...req.body,
    rating: parseInt(req.body.rating)
  };

  let doc = await res.locals.REVIEWS.findOneAndUpdate(
    { _id: ObjectId(req.params.reviewId) },
    { $set: object },
    { returnNewDocument: true }
  );

  console.log("TCL: /:reviewId", doc);

  doc["ok"] && res.send(resmsg(true, "review updated"));
});

module.exports = router;
