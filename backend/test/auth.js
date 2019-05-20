const expect = require("chai").expect;
const request = require("request");
const backend = "http://localhost:4000";

const j = request.jar();
const fake = () => ({ username: "a", password: "b" });
let cookies = {};

describe(`POST /auth`, () => {
  it("/auth/login", done => {
    request.post(
      `${backend}/auth/login`,
      { form: fake(), jar: j },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        
        j.getCookies(backend).map(c => {
          (cookies[c.key] = c.value)
        });
        
        let json = JSON.parse(body);
        
        expect(cookies).to.have.all.keys("sid", "unm", "utp");
        expect(json.status).to.be.true;
        
        console.table(cookies);
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
    