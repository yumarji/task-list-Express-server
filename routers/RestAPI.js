const express = require("express");
const RestAPI = express.Router();
const fs = require("fs");
const path = require("path");
const taskList = path.join(__dirname, "../lista.json");
const data = fs.readFileSync(taskList, "utf8");
const list = JSON.parse(data);
const { v4: uuidv4 } = require("uuid");

//Crear una nueva tarea.
RestAPI.post("/add", (req, res) => {
  try {
    const { task, description, isCompleted } = req.body;
    const newTask = {
      id: uuidv4(),
      task,
      description,
      isCompleted,
    };

    list.push(newTask);
    fs.writeFileSync(taskList, JSON.stringify(list, null, "\t"), "utf8");
    res.status(200).json({ list: list });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/* ruta:  http://127.0.0.1:3000/API/add
  {
    "task": "task 9",
    "description": "Practice English",
    "isCompleted": true
  }

*/

//Actualizar una tarea.
RestAPI.put("/update/:id", (req, res) => {
  try {
    const idTask = req.params.id;
    const taskUpdate = req.body;

    const newList = list.map((task) => {
      if (task.id == idTask) {
        return {
          id: idTask,
          task: taskUpdate.task,
          description: taskUpdate.description,
          isCompleted: taskUpdate.isCompleted,
        };
      } else {
        return task;
      }
    });
    fs.writeFileSync(taskList, JSON.stringify(newList, null, "\t"), "utf8");
    res.status(200).json({ list: newList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
/*ruta:   http://127.0.0.1:3000/API/update/id
 {
            "task": "task 2",
            "description": "go to the gym",
            "isCompleted": true
        }
*/

//Eliminar una tarea.
RestAPI.delete("/delete/:id", (req, res) => {
  try {
    const idTask = req.params.id;
    const newList = list.filter((task) => task.id != idTask);
    fs.writeFileSync(taskList, JSON.stringify(newList, null, "\t"), "utf8");
    res.status(200).json({ list: newList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//ruta:   http://127.0.0.1:3000/API/delete/id

//Listar todas las tareas.
RestAPI.get("/list", (req, res) => {
  res.status(200).json({ newList: list });
}); //Ruta  http://127.0.0.1:3000/API/list

//Ruta para ver las tareas completadas
RestAPI.get("/listcompleted", (req, res) => {
  const listCompleted = list.filter((task) => task.isCompleted === true);
  res.status(200).json({ newList: listCompleted });
}); //Ruta  http://127.0.0.1:3000/API/listcompleted

//Ruta para ver las tareas Incompletas
RestAPI.get("/listincomplete", (req, res) => {
  const listIncomplete = list.filter((task) => task.isCompleted === false);
  res.status(200).json({ newList: listIncomplete });
}); //Ruta  http://127.0.0.1:3000/API/listincomplete

//Obtener una sola tarea.
RestAPI.get("/list/:id", (req, res) => {
  const id = req.params.id;
  const index = list.findIndex((task) => task.id == id);

  res.status(200).json({ task: list[index] });
}); //Ruta  http://127.0.0.1:3000/API/list/id

module.exports = RestAPI;
