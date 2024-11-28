const Task = require("../db_schema/task-schema");
const NotFoundError = require("../custom_error/custom-error-handler");

const getAllTask = async (req, res, next) => {
  try {
    const allTask = await Task.find({});

    if (allTask.length < 1) {
      res.status(200).json({ msg: "no task found" });
    } else {
      res.status(200).json(allTask);
    }
  } catch (error) {
    next(error);
  }
};

// for practice
const getSingleTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id });

    if (!task) {
      const error = new NotFoundError("Task Not Found", 404);
      throw error;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndDelete({ _id });

    if (!task) {
      const error = new NotFoundError("Task Not Found", 404);
      throw error;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const _id = req.params.id;
  const newTask = req.body;

  try {
    const task = await Task.findOneAndUpdate({ _id }, newTask, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      const error = new NotFoundError("Task Not Found", 404);
      throw error;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTask,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
};
