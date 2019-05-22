const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";

let result;

describe(`/reviews`, () => {
  it("returns reviews with [200]", done => {
    request(`${backend}/reviews`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);

      result = JSON.parse(body);

      done();
    });
  });
});
