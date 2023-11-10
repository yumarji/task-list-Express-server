////Middleware para validar que el ID se encuentre dentro de la lista de tareas, es utilizado en los métodos DELETE y PUT.

const fs = require("fs");
const path = require("path");
const taskList = path.join(__dirname, "../lista.json");
const data = fs.readFileSync(taskList, "utf8");
const list = JSON.parse(data);

module.exports = function (req, res, next) {
  const idTask = req.params.id;

  index = list.findIndex((task) => task.id == idTask);

  if (index !== -1) {
    next();
  } else {
    return res.status(400).send({ error: "ID doesn't exist." });
  }
};
