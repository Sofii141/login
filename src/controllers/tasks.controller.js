import TaskSchema from "../models/task.model.js";
//---------------------------------------------------------------------

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskSchema.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new TaskSchema({
      title,
      description,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await TaskSchema.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    //{new: true} devuelve el dato nuevo actualizado y no los antiguos datos
    const task = await TaskSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await TaskSchema.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
