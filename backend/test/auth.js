const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";

const j = request.jar();
const fake = () => ({ username: "a", password: "b" });
let cookies = {};

describe(`auth/login`, () => {
  it("returns 3 cookies (sid, unm, utp)", done => {
    request.post(
      `${backend}/auth/login`,
      { form: fake(), jar: j },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);

        j.getCookies(backend).map(c => (cookies[c.key] = c.value));
        expect(cookies).to.have.all.keys("sid", "unm", "utp");

        expect(JSON.parse(body).status).to.be.true;

        done();
      }
    );
  });

  it("fails with empty form", done => {
    request.post(`${backend}/auth/login`, { form: {} }, (err, res, body) => {
      expect(res.statusCode).to.equal(400);

      const json = JSON.parse(body);
      expect(json).to.have.all.keys("status", "message");
      expect(json.status).to.be.false;
      expect(json.message).to.be.equal(`\"username\" is required`);

      done();
    });
  });

  it("fails with invalid form", done => {
    request.post(
      `${backend}/auth/login`,
      { form: { username: "a" } },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);

        const json = JSON.parse(body);
        expect(json).to.have.all.keys("status", "message");
        expect(json.status).to.be.false;
        expect(json.message).to.be.equal(`\"password\" is required`);

        done();
      }
    );
  });
});

describe(`auth/logout`, () => {
  it("clears 'sid' cookie", done => {
    request(`${backend}/auth/logout`, { jar: j }, (err, res, body) => {
      let cookies = j.getCookies(backend);
      expect(cookies).to.not.have.keys("sid");

      done();
    });
  });
});

describe(`auth//signup`, () => {
  it("fails with existing userinfo", done => {
    request.post(
      `${backend}/auth/signup`,
      { form: fake() },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);

        const json = JSON.parse(body);
        expect(json).to.have.all.keys("status", "message");
        expect(json.status).to.be.false;

        done();
      }
    );
  });

  it("fails with empty formdata", done => {
    request.post(`${backend}/auth/signup`, { form: {} }, (err, res, body) => {
      expect(res.statusCode).to.equal(400);

      const json = JSON.parse(body);
      expect(json).to.have.all.keys("status", "message");
      expect(json.status).to.be.false;
      expect(json.message).to.be.equal(`\"username\" is required`);

      done();
    });
  });

  it("fails with invalid formdata", done => {
    request.post(
      `${backend}/auth/signup`,
      { form: { password: "b" } },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);

        const json = JSON.parse(body);
        expect(json).to.have.all.keys("status", "message");
        expect(json.status).to.be.false;
        expect(json.message).to.be.equal(`\"username\" is required`);

        done();
      }
    );
  });
});
