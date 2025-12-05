import express from "express";
import { deleteStudentById, getAllStudents, setStudentInfo, updateStudentInfo } from "../controllers/StudentController.js";

const StudentRouter = express.Router();


StudentRouter.post("/setStudentInfo",setStudentInfo);
StudentRouter.put("/updateStudentInfo",updateStudentInfo);
StudentRouter.delete("/deleteStudentById/:id",deleteStudentById);
StudentRouter.get("/getStudents",getAllStudents);



export default StudentRouter;