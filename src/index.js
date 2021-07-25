const { response } = require("express");
const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { ReplSet } = require("mongodb");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("Get requeets are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("Under Maintanence");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const jwt = require("jsonwebtoken");
const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewtoy", {
    expiresIn: "7 days",
  });
  // console.log(token);

  const data = jwt.verify(token, "thisismynewtoy");
  // console.log(data);
};
myFunction();

//  M:/mongodb/bin/mongod.exe --dbpath=M:/mongodb-data
