const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type:String, required: true},
    completed: {type:Boolean, required: true, default: false}
});

const Tasks = mongoose.model("tasks", taskSchema);

module.exports = Tasks;