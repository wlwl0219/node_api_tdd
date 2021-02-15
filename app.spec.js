const should = require("should");
const supertest = require("supertest");
const app = require("./app");

describe("GET /users", () => {
  describe("성공", () => {
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

    it("최대 limit 갯수만큼 응답한다", done => {
      supertest(app)
        .get("/users?limit=2")
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패", () => {
    it("limit이 정수가 아니면 400을 응답한다.", done => {
      supertest(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /users/:id", () => {
  describe("성공", () => {
    it("유저 객체를 반환한다", done => {
      supertest(app)
        .get("/users/1")
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다", done => {
      supertest(app).get("/users/one").expect(400).end(done);
    });
    it("id로 유저를 찾을 수 없을 경우 404로 응답한다", done => {
      supertest(app).get("/users/999").expect(404).end(done);
    });
  });
});

describe("DELETE /users/:id", () => {
  describe("성공 204", () => {
    it("204응답", done => {
      supertest(app).delete("/users/3").expect(204).end(done);
    });
  });
  describe("실패", () => {
    it("id가 숫자가 아닐 경우 400", done => {
      supertest(app).delete("/users/three").expect(400).end(done);
    });
  });
});

describe("POST /users", () => {
  describe("성공", () => {
    it("생성한 유저 객체와 201을 응답", done => {
      supertest(app)
        .post("/users")
        .send({ name: "daniel" })
        .expect(201)
        .end((err, res) => {
          res.body.should.have.property("name", "daniel");
          done();
        });
    });
  });
  describe("실패", () => {
    it("name값 누락시 400", done => {
      supertest(app).post("/users").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409", done => {
      supertest(app)
        .post("/users")
        .send({ name: "alice" })
        .expect(409)
        .end(done);
    });
  });
});
