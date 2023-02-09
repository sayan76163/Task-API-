const app = require("./app");

const PORT = 8080;

const mongoose = require("mongoose");
mongoose.set("strictQuery",false);

const MONGODB_URI = "mongodb://127.0.0.1:27017";

mongoose.connect(MONGODB_URI,{dbName: "tasks"}, err =>{
    if(err){
        console.dir(err);
    }else{
         console.log('connected to Database');
    }
})

app.listen(PORT, err => {
    // console.log("server is listening on port No", PORT);

    if(err){
        console.dir(err);
    }else{
        console.log("server is listening on port No", PORT);
    }
});