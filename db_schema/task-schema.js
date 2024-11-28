const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "cannot accept null value"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
