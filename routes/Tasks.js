const router = require("express").Router();


const {default:mongoose} = require("mongoose");
const Tasks = require("../models/Tasks");


router.get("/", async (_req, res)=>{
    try {
        const result = await Tasks.find({});
        res.status(200).json({
            tasks: result,
        })
    } catch (error) {
        res.status(500).json({
            error: "something went wrong",
        })
    }
});
///
router.get("/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const result = await Tasks.findById(id);
        if(!result) {
            return res.status(404).json({
                error: "not found any task ID",
            });
        }
        res.status(200).json(result);
        
    }catch (err) {
        res.status(500).json({
            error: "something went wrong while fetching all the tasks",
        })
    }
});

////

router.post("/", async (req, res)=>{
    try {
        const {title, tasks} = req.body;
        if(!title && !tasks) {
            return res.status(404).json({
                error: "please provide a valid tittle"
            });
        }
        if(title) {
            const result = await Tasks.create({title});
            return res.status(201).json({id: result._id});
        }
        if(tasks) {
            const result = await Tasks.create(tasks);
            const arr = result.map(taskObj =>{
                return {id: taskObj._id}
            });
            return res.status(201).json({
                tasks: arr
            })
        }
    }catch(err) {
        res.status(500).json({
            error: "error while creating the task",
        });
    }
});
/////

router.delete('/', async (req,res)=>{
    try {
        const {tasks} = req.body;
        if(!tasks) {
            return res.status(404).json({ error: "hey! provide valid task to delete"});
        }
        const deleteArr = tasks.map(taskObj =>{
            return taskObj.id
        })
        const result = await Tasks.deleteMany({_id:{$in : deleteArr}});
        console.log(result,"deleted");
        if(result) {
            res.status(204).end();
        }else{
            res.status(404).json({error: "No found this task Id"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "error occured"
        })
    }
});

///////
 router.put("/:id", async(req,res)=> {
    try {
        const {id} = req.params;
        const {title, completed } = req.body;
        if(!id) {
            return res.status(404).json({error: "please provide valid ID"});
        }
        if(title === undefined || completed === undefined) {
            return res.status(404).json({
                error: "Provide valid title and task to completed",
            })
        }
        const result = await Tasks.findById(id);
        if(!result) {
            return res.status(404).json({error:"there is no taks found with that ID"});
        }
        const newTask = await Tasks.findByIdAndUpdate(
            id,
            {$set: {title, completed}},
            {new: true}
        );
        console.log(newTask, 'updated task');
        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "something went wrong",
        })
    }
 });
 ///////
 router.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(404).json({error:"provide valid id "});
        }
        const result = await Tasks.findByIdAndDelete(id);
        if(result) {
            res.status(204).end();
        }else{
            res.status(404).json({error: "No task found with this ID"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "something went wrong",
        });
    }
 });


module.exports = router;