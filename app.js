require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const listViewRouter = require("./routers/list-view-router");
const listEditRouter = require("./routers/list-edit-router");

app.use(express.json());

//Middleware tipo Aplicación para validar que los métods HTTP sean válidos.
app.use((req, res, next) => {
  const methodsEntry = ["GET", "PUT", "DELETE", "POST"];
  if (methodsEntry.includes(req.method)) {
    next();
  } else {
    return res.status(400).send("Method is invalid.");
  }
});

app.use([listViewRouter, listEditRouter]);

app.get("/", (req, res) => {
  res.send("Welcome to task list!");
});

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
