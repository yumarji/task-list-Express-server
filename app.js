require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const listViewRouter = require("./routers/list-view-router");
const listEditRouter = require("./routers/list-edit-router");
const checkToken = require("./middlewares/checkToken");
const users = require("./users.json");

app.use(express.json());
app.use(cors());

//Middleware tipo Aplicación para validar que los métodos HTTP sean válidos.
app.use((req, res, next) => {
  const methodsEntry = ["GET", "PUT", "DELETE", "POST"];
  if (methodsEntry.includes(req.method)) {
    next();
  } else {
    return res.status(400).send("Method is invalid.");
  }
});

//Ruta para Loguearse
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const index = users.findIndex((user) => user.email === email);

  if (index === -1) {
    res.status(400).send({ message: "User does not exist." });
  } else if (
    users[index].email === email &&
    users[index].password === password
  ) {
    const payload = {
      email: email,
      password: password,
      rol: users[index].rol,
    };

    const token = jwt.sign(payload, process.env.SECRET);
    res.status(200).send({ message: "Token was generated.", token });
  } else res.status(400).send({ message: "Password is invalid." });
});

//Ruta Raiz
app.get("/", checkToken, (req, res) => {
  res.send("WELCOME TO TASK-LIST!");
});

app.use([listViewRouter, listEditRouter]);

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
