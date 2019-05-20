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
  if (res.locals.USERNAME !== undefined) {
    var user = await res.locals.USERS.findOne({
      username: res.locals.USERNAME
    });

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
  const obj = {
    ...req.body,
    isDeleted: false
  };

  await res.locals.ITEMS.insertOne(obj, (err, insertedOne) => {
    if (err) {
      console.error(err);
      res.status(400).send(resmsg(false, err));
    } else {
      // console.info(insertedOne);
      res.send(resmsg(true, insertedOne.ops[0]._id));
    }
  });
});

router.put("/:itemId", async (req, res) => {
  let object = {
    ...req.body
  };

  let doc = await res.locals.ITEMS.findOneAndUpdate(
    { _id: ObjectId(req.params.itemId) },
    { $set: object },
    {}
  );

  console.log(`PUT /items/${req.params.itemId}`, doc);

  if (doc["ok"] === 1) res.send(resmsg(true));
  else res.status(400).send(resmsg(false));
});

router.delete("/:itemId", async (req, res) => {
  let doc = await res.locals.ITEMS.findOneAndUpdate(
    { _id: ObjectId(req.params.itemId) },
    { $set: { isDeleted: JSON.parse(req.body.isDeleted) } },
    {}
  );

  console.log(`DEL /items/${req.params.itemId}`, doc);

  if (doc["ok"] === 1) res.send(resmsg(true));
  else res.status(400).send(resmsg(false));
});

module.exports = router;
