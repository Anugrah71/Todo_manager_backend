const Task = require("../models/Todos");

exports.createTask = async (req, res) => {
  //Create a new task
  try {
    const { title, description } = req.body;
    //validate title
    if (!title || title.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Title must be at last 3 characters" });
    }
    //create task with default status = todo
    const task = await Task.create({
      title: title.trim(),
      description,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update task status( todo -> in_progress -> done)
exports.updateStatus = async (req, res) => {
  try {
    const { todoId, newStatus } = req.body;
    //validate input
    if (!todoId || !newStatus) return res.status(400).json({ error: "todoId and newStatus are required" });
    //find task by id
    const todo = await Task.findById(todoId);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    //allowed status transitions
    const allowedTransitions = {
      todo: ["in_progress", "done"],
      in_progress: ["done"],
      done: [],
    };

    const currentStatus = todo.status;
    //reject invalid transitions
    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      return res.status(400).json({
        error: `Cannot chagne status from ${currentStatus} to ${newStatus}`,
      });
    }

    todo.status = newStatus;
    //set completion time only when task become done
    if (newStatus === "done") {
      todo.completed_at = new Date();
    }
    //save changes
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//list tasks with status filter and sorted by newest first
exports.listTasks = async (req, res) => {
  try {
    const { status } = req.query;
    if (!status)
      return res.status(400).json({ error: "Status is not provided" });

    //remove any whitespaces
    const clearStatus = status.trim();

    //sort the todo based on filter and newest first
    const tasks = await Task.find({ status: clearStatus }).sort({
      created_at: -1,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//metrics total tasks, count per status, average completion time
exports.metrics = async (req, res) => {
  try {
    const tasks = await Task.find();

    let todo = 0;
    let in_progress = 0;
    let done = 0;
    let totalCompletionTime = 0;
    let completedCount = 0;

    //count tasks and calculate completion time
    tasks.forEach((task) => {
      switch (task.status) {
        case "todo":
          todo++;
          break;
        case "in_progress":
          in_progress++;
          break;
        case "done":
          done++;

          //calculate time difference only for completed tasks
          if (task.completed_at) {
            totalCompletionTime +=
              new Date(task.completed_at) - new Date(task.created_at);
            completedCount++;
          }
          break;
      }
    });

//average completion time in minutes
    const averageCompletionTime =
      completedCount > 0
        ? `${totalCompletionTime / completedCount / 60000} minutes`
        : "0 minutes";

    res.json({
      total: tasks.length,
      statusCounts: {
        todo,
        in_progress,
        done,
      },
      averageCompletionTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
