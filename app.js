const express = require("express");
const app = express();
const PORT = 3000;
const lista = require("./lista.json");

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/lista", (req, res) => {
  res.send({ lista });
});

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
