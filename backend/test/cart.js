const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";
let sid = -1

describe("Testing operations with the Cart", function() {
  before(function(done) {
    const j = request.jar();
    const fake = () => ({ username: "a", password: "b" });
    let cookies = {};

    request.post(
      `${backend}/auth/login`,
      { form: fake(), jar: j },
      (err, res, body) => {

        j.getCookies(backend).map(c => {
          cookies[c.key] = c.value;
        });

        sid = cookies.sid
        console.log("before sid: ", sid)

        done();
      }
    );
  });

  it("Add a new item to the Cart", function(done) {
    request("http://localhost:4000/cart/addItem", function(
      error,
      response,
      body
    ) {
      expect(response.statusCode).to.equal(sid);
      done();
    });
  });
});
