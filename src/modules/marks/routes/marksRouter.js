import express from "express";
import { deleteStudentMarks, getStudentMarksByStudentId, setStudentMarks, updateStudentMarks } from "../controllers/SubjectMarkController.js";

const marksRouter = express.Router();

marksRouter.post("/setStudentMarks", setStudentMarks);
marksRouter.put("/studentMarks/:id", updateStudentMarks);
marksRouter.delete("/studentMarks/:id", deleteStudentMarks);
marksRouter.get("/studentMarks/:studentId", getStudentMarksByStudentId);

export default marksRouter;