const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Mongo = require("./models/mongo.js");

const root = require("./routes/root.js");
const api = require("./routes/api.js");


const port = process.env.PORT || 3000;

Mongo();
app.use(express.static(__dirname + "/public"));


app.use("/", root)
app.use("/api", api);

app.use((req, res, next) => {
	res.status(404).send("Error 404");
});

app.listen(port, () => {
	console.log("Servidor en el puerto: " + port);
});