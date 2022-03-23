const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//ddbb

mongoose.connect(process.env.DB_URL, () => console.log("conectado a db"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("conectado a db"));

//import routes

const itemsRoutes = require("./routes/items");
const imgRoutes = require("./routes/img");


//middleware
app.use(cors());
app.use(express.json());
app.use("/items", itemsRoutes);
app.use("/img", imgRoutes);



app.get("/", (req, res) => {
  res.send("HOME");
});



//listen
app.listen(3000);
