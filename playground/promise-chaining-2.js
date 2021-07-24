require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("60fa7747ce08814a84ae0b0c")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: true });
  return count;
};

deleteTaskAndCount("60fa6380cec3b34fd85dae6f")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
