////Middleware para validar que el ID se encuentre dentro de la lista de tareas, en los métodos DELETE y PUT.

const fs = require("fs");
const path = require("path");
const taskList = path.join(__dirname, "../lista.json");
const data = fs.readFileSync(taskList, "utf8");
const list = JSON.parse(data);

module.exports = function (req, res, next) {
  const idTask = req.params.id;

  list.map((task) => {
    if (task.id == idTask) {
      next();
    } else {
      return res.status(400).send({ error: "ID doesn't exist." });
    }
  });
};
