const express = require("express");
const listEditRouter = express.Router();
const fs = require("fs");
const path = require("path");
const validPost = require("../middlewares/validPost");
const validPut = require("../middlewares/validPut");
const validId = require("../middlewares/validId");
const taskList = path.join(__dirname, "../lista.json");
const data = fs.readFileSync(taskList, "utf8");
const list = JSON.parse(data);
const { v4: uuidv4 } = require("uuid");

//Ruta para agregar tareas
listEditRouter.post("/add", validPost, (req, res) => {
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
    res.send({ list: list });
  } catch (error) {
    res.send({ error: error.message });
  }
});
/* ruta:  http://127.0.0.1:3000/add
  {
    "task": "task 4",
    "description": "Buy the gift",
    "isCompleted": true
  }

*/

//Ruta para borrar tareas
listEditRouter.delete("/delete/:id", validId, (req, res) => {
  try {
    const idTask = req.params.id;
    const newList = list.filter((task) => task.id != idTask);
    fs.writeFileSync(taskList, JSON.stringify(newList, null, "\t"), "utf8");
    res.send({ list: newList });
  } catch (error) {
    res.send({ error: error.message });
  }
});
//ruta:   http://127.0.0.1:3000/delete/1

//Ruta para editar tareas
listEditRouter.put("/update/:id", [validId, validPut], (req, res) => {
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
    res.status(200).send({ list: newList });
  } catch (error) {
    res.send({ error: error.message });
  }
});
/*ruta:   http://127.0.0.1:3000/update/b92bda13-b147-4d52-85cf-31f385f8c2ef
 {
            "task": "task 2",
            "description": "go to the gym",
            "isCompleted": true
        }
*/

module.exports = listEditRouter;
