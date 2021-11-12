const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	"number": Number,
},{collection: "numberDelivery"});

module.exports = mongoose.model("numberDelivery", Schema);