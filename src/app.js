import express from "express";
import StudentRouter from "./modules/students/routes/studentsRouter.js";
import marksRouter from "./modules/marks/routes/marksRouter.js";


const app = express();

app.use(express.json({limit:"15mb"}));


app.get("/",(req,res)=>{
    return res.status(200).json({message:"success"});
})

app.use("/api/student",StudentRouter);
app.use("/api/mark",marksRouter);


export default app;