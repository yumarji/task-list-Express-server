require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const listViewRouter = require("./routers/list-view-router");
const listEditRouter = require("./routers/list-edit-router");

app.use(express.json());
app.use([listViewRouter, listEditRouter]);

app.get("/", (req, res) => {
  res.send("Bienvenido a tu lista de tareas!");
});

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
