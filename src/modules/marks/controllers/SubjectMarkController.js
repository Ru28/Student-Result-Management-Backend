import StudentMarks from "../models/StudentMarks.js";
import Students from "../../students/models/Students.js";
import { averageMarkCalculation } from "../../../utils/AverageMarkCalculation.js";

export const setStudentMarks = async (req, res) => {
    try {
        const { studentId, subjectName, subjectMark } = req.body;

        if (!studentId || !subjectName || subjectMark === undefined) {
            return res.status(400).json({ success: false, message: "studentId, subjectName, subjectMark are required" });
        }

        const studentExists = await Students.findByPk(studentId);
        if (!studentExists) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const markData = await StudentMarks.create({
            studentId,
            subjectName,
            subjectMark,
        });

        await averageMarkCalculation(studentId);

        return res.status(201).json({ success: true, data: markData, message: "Student mark added successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

export const updateStudentMarks = async (req, res) => {
    try {
        const { id } = req.params;   // mark record id
        const { subjectName, subjectMark } = req.body;

        const markRecord = await StudentMarks.findByPk(id);
        if (!markRecord) {
            return res.status(404).json({ success: false, message: "Student mark record not found" });
        }

        await markRecord.update({
            subjectName: subjectName || markRecord.subjectName,
            subjectMark: subjectMark !== undefined ? subjectMark : markRecord.subjectMark,
        });

        await averageMarkCalculation(markRecord.studentId);

        return res.status(200).json({ success: true, data: markRecord, message: "Student mark updated successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};

export const deleteStudentMarks = async (req, res) => {
    try {
        const { id } = req.params;

        const markRecord = await StudentMarks.findByPk(id);
        if (!markRecord) {
            return res.status(404).json({ success: false, message: "Student mark record not found" });
        }

        await markRecord.destroy();

        await averageMarkCalculation(markRecord.studentId);

        return res.status(200).json({ success: true, message: "Student mark deleted successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};


export const getStudentMarksByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        const studentExists = await Students.findByPk(studentId);
        if (!studentExists) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const marks = await StudentMarks.findAll({
            where: { studentId },
            order: [["createdAt", "ASC"]]
        });

        return res.status(200).json({ success: true, data: marks });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};
