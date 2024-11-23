const Task = require("../db_schema/task-schema");

const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find({});

    if (allTask.length < 1) {
      res.status(200).json({ msg: "no task found" });
    } else {
      res.status(200).json(allTask);
    }
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndDelete({ _id });
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  const _id = req.params.id;
  const newTask = req.body;

  try {
    const task = await Task.findOneAndUpdate({ _id }, newTask, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
};
