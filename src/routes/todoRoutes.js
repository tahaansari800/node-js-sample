const express = require("express");
const Todo = require("../models/todoModels");
console.log(Todo);
const router = express.Router();

//crate a new TO-Do
router.post("/todos", async (req, res) => {
  try {
    console.log(req.body); // This should print the request body in the console
    const { title, description } = req.body; // Extract data from the body
    const newTodo = new Todo({ title, description }); // Create a new instance
    const savedTodo = await newTodo.save(); // Save to the database
    res.status(201).json({
      id: savedTodo.id,
      title: savedTodo.title,
      description: savedTodo.description,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all todo
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({createdAt:-1});
    res.status(201).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a single todo by id

router.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    if (!todo) return res.status(404).json({ error: "ToDo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update to do by id
router.put("/todos/:id", async (req, res) => {
  try {
    const allowedUpdates = ["title", "description", "completed"];
    const updates = Object.keys(req.body);

    // Ensure only valid fields are updated
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    const todo = await Todo.findOneAndUpdate(
      { id: req.params.id }, // Find by `id`
      req.body,
      { new: true, runValidators: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete todo by id

router.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({id:parseInt(req.params.id)});
    if (!todo) return res.status(400).json({ error: "Todo not found" });
    res.json({ message: "ToDo deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
