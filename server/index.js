const express = require("express");
const { default: mongoose } = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

const app = express();

const uri = "mongodb://127.0.0.1:27017";
mongoose.connect(uri, { dbName: "bookstore" });
requireDir("./models");

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes"));


app.listen(3000, () => {
  console.log("Exemplo de aplicativo ouvindo a porta 3000");
});