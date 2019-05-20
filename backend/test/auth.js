const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";

const j = request.jar();
const fake = () => ({ username: "a", password: "b" });
let cookies = {};

describe(`POST /auth`, () => {
  it("/auth/login return with cookies", done => {
    request.post(
      `${backend}/auth/login`,
      { form: fake(), jar: j },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);

        j.getCookies(backend).map(c => (cookies[c.key] = c.value));
        expect(cookies).to.have.all.keys("sid", "unm", "utp");
        // console.table(cookies);

        expect(JSON.parse(body).status).to.be.true;

        done();
      }
    );
  });

  it("/auth/login with empty form", done => {
    request.post(`${backend}/auth/login`, { form: {} }, (err, res, body) => {
      expect(res.statusCode).to.equal(400);

      const json = JSON.parse(body);
      expect(json).to.have.all.keys("status", "message");
      expect(json.status).to.be.false;
      expect(json.message).to.be.equal(`\"username\" is required`);

      done();
    });
  });

  it("/auth/login with just username", done => {
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

  it("/auth/signup ", done => {
    request.post(
      `${backend}/auth/signup`,
      { form: fake() },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);

        const json = JSON.parse(body);
        expect(json).to.have.all.keys("status", "message");
        expect(json.status).to.be.false;

        done();
      }
    );
  });

  it("/auth/signup with empty form", done => {
    request.post(`${backend}/auth/signup`, { form: {} }, (err, res, body) => {
      expect(res.statusCode).to.equal(400);

      const json = JSON.parse(body);
      expect(json).to.have.all.keys("status", "message");
      expect(json.status).to.be.false;
      expect(json.message).to.be.equal(`\"username\" is required`);

      done();
    });
  });

  it("/auth/signup with just password", done => {
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
    
    it("/auth/signup ", done => {
      request.post(
        `${backend}/auth/signup`,
        { form: fake() },
        (err, res, body) => {
          expect(res.statusCode).to.equal(200);
          
          let json = JSON.parse(body);
          
          expect(json).to.have.all.keys("status", "message");
          expect(json.status).to.be.false;
          
          done();
        }
        );
      });
    });    
    