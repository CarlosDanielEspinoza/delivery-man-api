const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.US}:${process.env.PASSWORD}@kurocluster.o0ej6.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const MongoDB = async () => {
	mongoose.connect(uri, {useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=> {
        console.log("Base de datos conectada");
    }).catch((e)=>{
        console.log(e);
	});
}

module.exports = MongoDB;