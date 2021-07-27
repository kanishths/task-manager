const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//  M:/mongodb/bin/mongod.exe --dbpath=M:/mongodb-data
