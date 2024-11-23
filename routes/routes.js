const {
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/controller");

const express = require("express"); 
const router = express.Router();

router.get("/", getAllTask); // done
router.post("/", createTask); // done

router.delete("/:id", deleteTask); // done
router.patch("/:id", updateTask); // done

module.exports = router;
