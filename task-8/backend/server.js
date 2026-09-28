const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const TASKS_FILE = path.join(__dirname, "data", "tasks.json");

app.use(cors());
app.use(express.json());

function readTasks() {
  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf-8"));
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

app.get("/api/tasks", (req, res) => {
  try {
    res.status(200).json(readTasks())
  } catch(error) {
    console.error(error)
    res.status(500).json({message: 'Unable to load tasks'})
  }
});

app.get("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const number = Number(req.params.id);
  const task = tasks.find((t) => t.number === number);
  if (!task) return res.status(404).json({ error: `Task ${number} not found` });
  res.status(200).json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const number = Number(req.params.id);
  const task = tasks.find((t) => t.number === number);
  if (!task) return res.status(404).json({ error: `Task ${number} not found` });

  const { status } = req.body;
  const validStatuses = ["completed", "in-progress", "not-started"];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${validStatuses.join(", ")}` });
  }

  task.status = status;
  writeTasks(tasks);
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`TechBridge API running at http://localhost:${PORT}`);
});