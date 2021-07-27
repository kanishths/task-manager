const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Mike",
  email: "eike@example.com",
  password: "50what123!",
};
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should Sign up a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Kanishth",
      email: "kanishtha@example.com",
      password: "MyPass777!",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login in nonexisting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "auidawo",
    })
    .expect(400);
});
