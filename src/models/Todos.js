const mongoose = require("mongoose");

//task schema definition
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3 },
    description: String,
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    completed_at: Date,
  },
  //automatically manage created_at and update_at
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);
module.exports = mongoose.model("Task", taskSchema);
