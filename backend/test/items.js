const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";

let items, itemId;

describe(`GET /items`, () => {
  it("/items status", done => {
    request(`${backend}/items`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);

      items = JSON.parse(body);

      done();
    });
  });

  it("/items return object", done => {
    expect(items).to.have.all.keys("items", "page", "total", "limit");

    done();
  });

  it("/items return object types", done => {
    expect(items.items).to.be.an("array");
    expect(items.page).to.be.a("number");
    expect(items.total).to.be.a("number");
    expect(items.limit).to.be.a("number");

    done();
  });

  it("/items?page=2", done => {
    request(`${backend}/items?page=2`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("/items?limit=100", done => {
    request(`${backend}/items?limit=100`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("/items?search=a", done => {
    request(`${backend}/items?search=a`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("/items?page=1&limit=100&search=a", done => {
    request(`${backend}/items?page=1&limit=100&search=a`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("/items/:itemId", done => {
    request(`${backend}/items/${items.items[0]._id}`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("/items/:itemId/reviews", done => {
    request(
      `${backend}/items/${items.items[0]._id}/reviews`,
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      }
    );
  });
});

const fake = () => ({
  name: `item name ${Math.floor(Math.random() * 100 + 10)}`,
  price: Math.floor(Math.random() * 100 + 30),
  imgUrl: `https://baconmockup.com/200/${Math.floor(
    Math.random() * 100 + 150
  )}`,
  description: "test by mocha"
});

describe(`POST /items`, () => {
  it("post an item", done => {
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

describe(`PUT /items/:itemId`, () => {
  it("put an item", done => {
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

describe(`DELETE /items/:itemId`, () => {
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
