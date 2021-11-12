const express = require("express");
const router = express.Router();

const Data = require("../models/data.js");
const NumberDelivery = require("../models/numberDelivery.js");


router.use(express.urlencoded({ extended: false}));
router.use(express.json());

router.get("/load", async (req, res) => {
	const load_Delivery = await NumberDelivery.find();
	const load_Data = await Data.find();
	
	const result = {load_Delivery,load_Data};
	res.send(result);
});

router.get("/read", async (req, res) => {
	const read = await NumberDelivery.find();
	res.send(read[0]);
})

router.post("/upload", async (req, res) => {
	const findDrivers = await NumberDelivery.find();
	
	if(req.body.count){ 
		if(findDrivers[0].number == 8){
			//Nothing
		} else {
			let newValue = findDrivers[0].number + 1;
			updateDrivers = await NumberDelivery.updateOne({number: findDrivers[0].number}, {number: newValue});
			const updateData = await Data.updateOne({name: req.body.name},{value: req.body.value});
		}

	}else{ 
		if(findDrivers[0].number == 0){
			//Nothing
		}else{
			let newValue = findDrivers[0].number - 1;
			updateDrivers = await NumberDelivery.updateOne({number: findDrivers[0].number}, {number: newValue});
			const updateData = await Data.updateOne({name: req.body.name},{value: req.body.value});
		}
	} 

	res.send("X");
});

module.exports = router;