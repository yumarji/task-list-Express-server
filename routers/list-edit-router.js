const express = require("express");
const listEditRouter = express.Router();
const fs = require("fs");
const path = require("path");
const taskList = path.join(__dirname, "../lista.json");
const data = fs.readFileSync(taskList, "utf8");
const list = JSON.parse(data);

const validPost = require("../middlewares/validPost");
const validPut = require("../middlewares/validPut");
const validId = require("../middlewares/validId");

const checkToken = require("../middlewares/checkToken");
const checkRol = require("../middlewares/checkRol");

const { v4: uuidv4 } = require("uuid");

//Ruta para agregar tareas
listEditRouter.post(
  "/api/add",
  [checkToken, checkRol, validPost],
  (req, res) => {
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
      res.status(200).send({ message: "Task was added." });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);
/* ruta:  http://127.0.0.1:3000/api/add
  {
    "task": "task 4",
    "description": "Buy the gift",
    "isCompleted": true
  }

*/

//Ruta para borrar tareas
listEditRouter.delete(
  "/api/delete/:id",
  [checkToken, checkRol, validId],
  (req, res) => {
    try {
      const idTask = req.params.id;
      const newList = list.filter((task) => task.id != idTask);
      fs.writeFileSync(taskList, JSON.stringify(newList, null, "\t"), "utf8");
      res.status(200).send({ message: "Task was deleted." });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
);
//ruta:   http://127.0.0.1:3000/api/delete/id

//Ruta para editar tareas
listEditRouter.put(
  "/api/edit/:id",
  [checkToken, checkRol, validId, validPut],
  (req, res) => {
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
      res.status(200).send({ message: "task was updated." });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);
/*ruta:   http://127.0.0.1:3000/api/update/id
 {
            "task": "task 20",
            "description": "go to the gym",
            "isCompleted": true
        }
*/

module.exports = listEditRouter;
