const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be greater than 0");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password should not contain word 'password'");
      }
    },
  },
});

/* const me = new User({
  name: "     Kanishth    ",
  email: "KANIShtA@mad.com      ",
  password: "    123Password1234     ",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error!", error);
  }); */

const Task = mongoose.model("Tasks", {
  description: {
    type: String,
    trim: true,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

const task2 = new Task({
  description: "    Finish video   ",
});

task2
  .save()
  .then(() => {
    console.log(task2);
  })
  .catch((error) => {
    console.log(error);
  });
