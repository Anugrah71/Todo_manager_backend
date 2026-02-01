const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskContorller");

//create task
router.post("/createtask", taskController.createTask);

//update task status
router.patch("/updatestatus", taskController.updateStatus);

//list tasks based on filter
router.get("/tasks", taskController.listTasks);

//get all the counts and average complteted time
router.get("/metrics", taskController.metrics);

module.exports = router;
