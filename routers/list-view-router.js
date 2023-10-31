const express = require("express");
const listViewRouter = express.Router();
const fs = require("fs");
const path = require("path");
const taskList = path.join(__dirname, "../lista.json");
const data = fs.readFileSync(taskList, "utf8");
const list = JSON.parse(data);

//Ruta para ver todas las tareas

listViewRouter.get("/list", (req, res) => {
  res.send({ newList: list });
}); //Ruta  http://127.0.0.1:3000/list

//Ruta para ver las tareas completadas
listViewRouter.get("/listCompleted", (req, res) => {
  const listCompleted = list.filter((task) => task.isCompleted === true);
  res.send({ newList: listCompleted });
}); //Ruta  http://127.0.0.1:3000/listCompleted

//Ruta para ver las tareas Incompletas
listViewRouter.get("/listIncomplete", (req, res) => {
  const listIncomplete = list.filter((task) => task.isCompleted === false);
  res.send({ newList: listIncomplete });
}); //Ruta  http://127.0.0.1:3000/listIncomplete

module.exports = listViewRouter;
