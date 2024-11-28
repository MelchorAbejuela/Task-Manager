const {
  getAllTask,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/controller");

const express = require("express"); // in express, by default, we right away get the req, res, next
const router = express.Router();

router.get("/", getAllTask); // done
router.post("/", createTask); // done

router.delete("/:id", deleteTask); // done
router.patch("/:id", updateTask); // done

router.get("/:id", getSingleTask);

module.exports = router;
