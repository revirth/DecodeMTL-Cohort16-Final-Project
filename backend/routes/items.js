const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

let paginzation = query => {
  const limit = query.limit ? parseInt(query.limit) : parseInt(10); // default paging size 10
  const page = query.page ? parseInt(query.page) : 1;
  const skip = page ? (page - 1) * limit : 0;

  return { limit: limit, page: page, skip: skip };
};

router.get("/", async (req, res) => {
  let sid = req.cookies.sid;
  let username = res.locals.SESSIONS[sid];

  const query = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i"
        },
        isDeleted: false
      }
    : { isDeleted: false };

  // for seller user, delete 'isDeleted' filter
  if (username !== undefined) {
    var user = await res.locals.USERS.findOne({ username: username });

    user.usertype === 2 && delete query.isDeleted;
  }

  const page = paginzation(req.query);

  const docs = await res.locals.ITEMS.find(query)
    .skip(page.skip)
    .limit(page.limit)
    .toArray();

  const data = {
    items: docs,
    page: page.page,
    total: await res.locals.ITEMS.countDocuments(query),
    limit: page.limit
  };

  res.send(data);
});

router.get("/:itemId", async (req, res) => {
  let _id = ObjectId(req.params.itemId);
  let doc = await res.locals.ITEMS.findOne(_id);

  res.send(doc);
});

router.get("/:itemId/reviews", async (req, res) => {
  let query = {
    itemId: req.params.itemId
  };
  let docs = await res.locals.REVIEWS.find(query).toArray();

  res.send(docs);
});

router.post("/", async (req, res) => {
  // store an item in Mongo
  let obj = {
    ...req.body,
    isDeleted: false
  };

  await res.locals.ITEMS.insertOne(obj);
  res.send(resmsg(true, "item inserted"));
});

router.put("/:itemId", async (req, res) => {
  let object = {
    ...req.body
  };

  let doc = await res.locals.ITEMS.findOneAndUpdate(
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

router.delete("/:itemId", async (req, res) => {
  let doc = await res.locals.ITEMS.findOneAndUpdate(
    { _id: ObjectId(req.params.itemId) },
    { $set: { isDeleted: JSON.parse(req.body.isDeleted) } },
    { returnNewDocument: false }
  );

  console.log(doc);

  doc["ok"] && res.send(resmsg(true, "item deleted"));
});

module.exports = router;
