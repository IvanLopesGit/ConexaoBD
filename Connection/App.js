const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routeUsers = require("./CRUD/Users");
const routeLogin = require("./CRUD/Login");

app.use(bodyParser.urlencoded({ extended: false })); //Aceita apenas dados simples
app.use(bodyParser.json()); //Json de entrada

//CORS - Permite os recursos serem acessados por um domínio diferente
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "put, post, patch, delete, get");
    return res.status(200).send({});
  }

  next();
});

app.use("/users", routeUsers);
app.use("/login", routeLogin);

//Tratamento de erro, rota não encontrada
app.use((req, res, next) => {
  const error = new Error("Página não encontrado");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
