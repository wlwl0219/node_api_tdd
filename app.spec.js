const should = require("should");
const supertest = require("supertest");
const app = require("./app");

describe("GET /users", () => {
  it("배열을 반환한다", done => {
    supertest(app)
      .get("/users")
      .end((err, res) => {
        if (err) throw err;
        res.body.should.be.instanceOf(Array);
        res.body.forEach(user => user.should.have.property("name"));
        done();
      });
  });
});
