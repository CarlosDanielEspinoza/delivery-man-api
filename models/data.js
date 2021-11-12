const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	"name" : String,
	"value": Number,
},{collection: "dataDelivery"});

module.exports = mongoose.model("data", Schema);