const express = require("express");

const app = express();
const taskRoutes = require("./routes/Tasks");

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (_req, res)=>{
       res.send("welcome to Task API")
})

app.use("/v1/tasks", taskRoutes);

module.exports= app;