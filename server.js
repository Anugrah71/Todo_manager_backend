const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const taskRoutes = require("./src/routes/taskRouter");

const app = express();
app.use(express.json());
 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task manager backend is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
