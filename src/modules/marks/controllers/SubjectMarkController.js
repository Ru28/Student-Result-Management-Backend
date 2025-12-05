import StudentMarks from "../models/StudentMarks.js";
import Students from "../../students/models/Students.js";
import { averageMarkCalculation } from "../../../utils/AverageMarkCalculation.js";
import { Op } from "sequelize";

export const setStudentMarks = async (req, res) => {
    try {
        const { studentId, subjectName, subjectMark } = req.body;

        // Validate all required fields
        if (!studentId || !subjectName || subjectMark === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: "studentId, subjectName, and subjectMark are required" 
            });
        }

        // Validate subjectName is not empty
        if (typeof subjectName !== 'string' || subjectName.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                message: "Subject name cannot be empty" 
            });
        }

        // Validate subjectMark is a valid number
        const mark = parseFloat(subjectMark);
        if (isNaN(mark) || mark < 0 || mark > 100) {
            return res.status(400).json({ 
                success: false, 
                message: "Subject mark must be a number between 0 and 100" 
            });
        }

        // Check if student exists
        const studentExists = await Students.findByPk(studentId);
        if (!studentExists) {
            return res.status(404).json({ 
                success: false, 
                message: "Student not found" 
            });
        }

        // Normalize subject name (case-insensitive)
        const normalizedSubjectName = subjectName.toLowerCase().trim();

        // Check if subject with same name already exists for this student
        const findSubjectWithSameName = await StudentMarks.findOne({
            where: {
                studentId,
                subjectName: normalizedSubjectName,
            }
        });

        if (findSubjectWithSameName) {
            return res.status(400).json({ 
                success: false, 
                message: `Subject "${subjectName}" already exists for student ${studentExists.name}. Please use a different subject name.` 
            });
        }

        // Create the mark record
        const markData = await StudentMarks.create({
            studentId,
            subjectName: normalizedSubjectName,
            subjectMark: mark,
        });

        // Recalculate average marks
        await averageMarkCalculation(studentId);

        return res.status(201).json({ 
            success: true, 
            data: markData, 
            message: "Student mark added successfully" 
        });

    } catch (error) {
        console.error("Error setting student marks:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

export const updateStudentMarks = async (req, res) => {
    try {
        const { id } = req.params;   // mark record id
        const { subjectName, subjectMark } = req.body;

        // Validate input
        if (subjectName !== undefined && (!subjectName || subjectName.trim() === '')) {
            return res.status(400).json({ 
                success: false, 
                message: "Subject name cannot be empty" 
            });
        }

        const markRecord = await StudentMarks.findByPk(id);
        if (!markRecord) {
            return res.status(404).json({ 
                success: false, 
                message: "Student mark record not found" 
            });
        }

        // Check if we're updating subjectName and if it would create a duplicate
        if (subjectName !== undefined) {
            const normalizedSubjectName = subjectName.toLowerCase().trim();
            
            const findSubjectWithSameName = await StudentMarks.findOne({
                where: {
                    studentId: markRecord.studentId,
                    subjectName: normalizedSubjectName,
                    id: { [Op.ne]: id } // Exclude current record
                }
            });

            if (findSubjectWithSameName) {
                // Get student name for better error message
                const student = await Students.findByPk(markRecord.studentId);
                const studentName = student ? student.name : 'the student';
                
                return res.status(400).json({ 
                    success: false,
                    message: `Subject "${subjectName}" already exists for ${studentName}. Please use a different subject name.`
                });
            }
        }

        // Prepare update data
        const updateData = {};
        
        if (subjectName !== undefined) {
            updateData.subjectName = subjectName.toLowerCase().trim();
        }
        
        if (subjectMark !== undefined) {
            // Optional: Validate subjectMark is a number and within range
            const mark = parseFloat(subjectMark);
            if (isNaN(mark) || mark < 0 || mark > 100) {
                return res.status(400).json({
                    success: false,
                    message: "Subject mark must be a number between 0 and 100"
                });
            }
            updateData.subjectMark = mark;
        }

        // Update the record
        await markRecord.update(updateData);

        // Recalculate average marks
        await averageMarkCalculation(markRecord.studentId);

        return res.status(200).json({ 
            success: true, 
            data: markRecord, 
            message: "Student mark updated successfully" 
        });

    } catch (error) {
        console.error("Error updating student marks:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
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
