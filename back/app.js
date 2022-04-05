const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const User = require("./routes/user");

const PUERTO = 443;

https
  .createServer(
    {
      cert: fs.readFileSync("jordan.crt"),
      key: fs.readFileSync("jordan.key"),
    },
    app
  )
  .listen(PUERTO, () => {
    console.log("server port 443 https");
  });

require("dotenv").config();
//ddbb

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("conectado a db"));

//import routes

const itemsRoutes = require("./routes/items");
const imgRoutes = require("./routes/img");
const mpRoutes = require("./routes/mp");
const loginRoutes = require("./routes/user");

//middleware
app.use(cors());
app.use(express.json());
app.use("/items", itemsRoutes);
app.use("/img", imgRoutes);
app.use("/mp", mpRoutes);
app.use("/user", loginRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  const { mail, password } = req.body;

  const user = new User({
    mail,
    password,
  });
  console.log(user);
  user.save((err) => {
    if (err) {
      res.status(500).send("Error al registrar Usuario.");
    } else {
      res.status(200).send("Usuario registrado exitosamente!");
    }
  });
});

app.post("/authenticate", (req, res) => {
  const { mail, password } = req.body;
  User.findOne({ mail }, (err, user) => {
    if (err) {
      res.status(500).send("Error al autenticar al Usuario.");
    } else if (!user) {
      res.status(200).send("El Usuario no existe.");
    } else {
      user.isCorrectPassword(password, (err, result) => {
        if (err) {
          res.status(500).send("Error al autenticar.");
        } else if (result) {
          res.status(200).send("Usuario autenticado correctamente.");
        } else {
          res.status(500).send("Usuario o contraseña incorrecta.");
        }
      });
    }
  });
});

module.exports = app;
