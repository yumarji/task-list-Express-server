//Middleware para validar que el body no esté vacío y que los campos a modificar sean correctos, en el método PUT.

module.exports = function validPut(req, res, next) {
  const newTask = req.body;

  if (Object.keys(newTask).length === 0) {
    return res.status(400).send({ error: "Body don't have any value." });
  } else if (!newTask.task) {
    return res.status(400).send({ error: "Task is invalid." });
  } else if (!newTask.description) {
    return res.status(400).send({ error: "Description is invalid." });
  } else if (newTask.isCompleted !== true && newTask.isCompleted !== false) {
    return res.status(400).send({ error: "isCompleted is invalid." });
  } else {
    next();
  }
};
