const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";

let result;

describe(`GET /reviews`, () => {
  it("/reviews status", done => {
    request(`${backend}/reviews`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);

      result = JSON.parse(body);

      done();
    });
  });
});
