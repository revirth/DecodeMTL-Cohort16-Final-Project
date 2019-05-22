const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";

let items, itemId;

const fake = () => ({
  name: `item name ${Math.floor(Math.random() * 100 + 10)}`,
  price: Math.floor(Math.random() * 100 + 30),
  imgUrl: `https://baconmockup.com/200/${Math.floor(
    Math.random() * 100 + 150
  )}`,
  description: "test by mocha"
});

describe(`/items`, () => {
  it("returns items with status code 200", done => {
    request(`${backend}/items`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);

      items = JSON.parse(body);

      done();
    });
  });

  it("returns object {items, page, total, limit}", done => {
    expect(items).to.have.all.keys("items", "page", "total", "limit");

    done();
  });

  it("returns proper object types", done => {
    expect(items.items).to.be.an("array");
    expect(items.page).to.be.a("number");
    expect(items.total).to.be.a("number");
    expect(items.limit).to.be.a("number");

    done();
  });
});

describe(`/items?page=2`, () => {
  it("returns page 2 items", done => {
    request(`${backend}/items?page=2`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe(`/items?limit=100`, () => {
  it("returns items", done => {
    request(`${backend}/items?limit=100`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe(`/items?search=a`, () => {
  it("return items who has '*a*' name ", done => {
    request(`${backend}/items?search=a`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe(`/items?page=1&limit=100&search=a`, () => {
  it("returns items without error", done => {
    request(`${backend}/items?page=1&limit=100&search=a`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe(`/items [POST]`, () => {
  it("adds an item", done => {
    request.post(`${backend}/items`, { form: fake() }, (err, res, body) => {
      expect(res.statusCode).to.equal(200);

      let json = JSON.parse(body);

      expect(json).to.have.all.keys("status", "message");
      expect(json.status).to.be.true;

      itemId = json.message;

      done();
    });
  });
});

describe(`/items [PUT]`, () => {
  it("edits an item", done => {
    expect(itemId).to.be.a("string");

    request.put(
      `${backend}/items/${itemId}`,
      { form: fake() },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);

        let json = JSON.parse(body);
        expect(json.status).to.be.true;

        done();
      }
    );
  });
});

describe(`/items [DELETE]`, () => {
  it("delete an item", done => {
    expect(itemId).to.be.a("string");

    request.delete(
      `${backend}/items/${itemId}`,
      { form: { ...fake(), isDeleted: true } },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);

        let json = JSON.parse(body);
        expect(json.status).to.be.true;

        itemId = json.message;
        done();
      }
    );
  });
});

describe(`/items/:itemId`, () => {
  it("returns an item ", done => {
    request(`${backend}/items/${items.items[0]._id}`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe(`/items/:itemId/reviews`, () => {
  it("returns item's reviews", done => {
    request(
      `${backend}/items/${items.items[0]._id}/reviews`,
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      }
    );
  });
});
