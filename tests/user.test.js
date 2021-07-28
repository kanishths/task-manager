const { Mongoose } = require("mongoose");
const { response } = require("express");
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");
beforeEach(setupDatabase);

test("Should Sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Kanishth",
      email: "kanishtha@example.com",
      password: "MyPass777!",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "Kanishth",
      email: "kanishtha@example.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("MyPass777!");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).not.toBeNull();
  expect(response.body.token).toBe(user.tokens[1].token);
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

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthorized users", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Mukun",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toBe("Mukun");
});

test("Should not update invalid user", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "India",
    })
    .expect(400);
});
// Should not signup user with invalid name/email/password
test("Should not signup user with invalid name", async () => {
  await request(app)
    .post("/users")
    .send({
      email: "test@example.fr",
      password: "SuperMotDePasse",
    })
    .expect(400);
});

test("Should not signup user with invalid email", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "blalba",
      email: "test.fr",
      password: "SuperMotDePasse",
    })
    .expect(400);
});

test("Should not signup user with invalid password", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "blalba",
      email: "test.fr",
      password: "ThePassword",
    })
    .expect(400);
});

// Not update user if unauthenticated
test("Should not update user if unauthenticated", async () => {
  await request(app)
    .patch("/users/me")
    .send({
      name: "Franck",
    })
    .expect(401);
});

// Should not update user with invalid name/email/password
test("Should not update user with invalid name", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "",
    })
    .expect(400);
});

test("Should not update user with invalid email", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      email: "@example.com",
    })
    .expect(400);
});

test("Should not update user with invalid password", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      password: "worstpasswordEver",
    })
    .expect(400);
});

// Should not delete user if unauthenticated
test("Should not delete account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", ``)
    .send()
    .expect(401);
});
