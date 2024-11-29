const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Crear la aplicación Express
const app = express();
const port = 5000; // Puerto del backend

// Middleware
app.use(express.json()); // Para manejar datos en formato JSON
app.use(cors()); // Permitir peticiones desde el frontend

// Conexión a MongoDB
mongoose
  .connect("mongodb://todo-db:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

// Modelo de Tareas
const Task = mongoose.model("Task", {
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Rutas
// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo las tareas" });
  }
});

// Crear una nueva tarea
app.post("/tasks", async (req, res) => {
  const { description } = req.body;
  try {
    const newTask = new Task({ description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creando la tarea" });
  }
});

// Actualizar una tarea
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { description, completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando la tarea" });
  }
});

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando la tarea" });
  }
});

// Iniciar el servidor
app.listen(5000,'0.0.0.0',() => {
    console.log('Backend running on http://0.0.0.0:5000');
});
