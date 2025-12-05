import AggregationMarks from "../../marks/models/AggregationMarks.js";
import StudentMarks from "../../marks/models/StudentMarks.js";
import Students from "../models/Students.js";
import { Op } from "sequelize";


export const setStudentInfo = async(req, res)=>{
    try {
        const { name, rollNumber, standard, email, phone} = req?.body;
        if(!name || !rollNumber || !standard || !email || !phone){
            return res.status(400).json({success:false, message: "name, rollNumber, standard, email, phone are required"});
        }

        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message:"invalid email"});
        }

        const mobileRegex = /^[6-9]\d{9}$/;
        if(!mobileRegex.test(phone)){
            return res.status(400).json({success:false,message:"invalid phone number. please inter valid phone number"});
        }

        const letter = String.fromCharCode(64 + Number(standard)); 
        const studentCardId = `${letter}${rollNumber}`;
        const existStudent = await Students.findOne({
            where:{
                studentCardId
            }
        })

        if(existStudent){
            return res.status(400).json({success:false, message:`rollNumber ${rollNumber} alreagy exists with studentCardId ${studentCardId}`});
        }

        const studentData= await Students.create({
            name,
            rollNumber,
            studentCardId,
            standard,
            email,
            phone
        });

        const aggregateMarksData = await AggregationMarks.create({
            studentId:studentData.id,
            resultMark: 0
        });

        const data = {
            id:studentData.id,
            name: studentData.name,
            rollNumber: studentData.rollNumber,
            resultMark: aggregateMarksData.resultMark,
            studentCardId: studentData.studentCardId,
            standard: studentData.standard,
            email: studentData.email,
            phone: studentData.phone,
            updatedAt: studentData.updatedAt,
            createdAt: studentData.createdAt,
        };

        return res.status(201).json({success:true,data, message: "student store successfully"});

    } catch (error) {
        console.error("message: ",error);
        return res.status(500).json({success:false, message:"internal server error",error});
    }
}

export const updateStudentInfo = async (req, res) => {
    try {
        const { id } = req.query;
        const { name, rollNumber, standard, email, phone } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "student id is required" });
        }

        // Validate body fields (optional update allowed)
        if (email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ success: false, message: "invalid email" });
            }
        }

        if (phone) {
            const mobileRegex = /^[6-9]\d{9}$/;
            if (!mobileRegex.test(phone)) {
                return res.status(400).json({
                    success: false,
                    message: "invalid phone number. Please enter a valid number",
                });
            }
        }

        // Check student exists
        const student = await Students.findByPk(id);
        if (!student) {
            return res.status(404).json({ success: false, message: "student not found" });
        }

        // If standard or rollNumber changes → regenerate studentCardId
        let studentCardId = student.studentCardId;
        if (standard || rollNumber) {
            const updatedStandard = standard || student.standard;
            const updatedRoll = rollNumber || student.rollNumber;
            const letter = String.fromCharCode(64 + Number(updatedStandard));
            studentCardId = `${letter}${updatedRoll}`;

            // Ensure uniqueness
            const exists = await Students.findOne({
                where: {
                    studentCardId,
                    id: { [Op.ne]: id }
                }
            });

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: `rollNumber ${updatedRoll} already exists for standard ${updatedStandard}`
                });
            }
        }

        // Update student
        await student.update({
            name: name ?? student.name,
            rollNumber: rollNumber ?? student.rollNumber,
            standard: standard ?? student.standard,
            email: email ?? student.email,
            phone: phone ?? student.phone,
            studentCardId
        });

        // Fetch aggregation marks
        const aggregateMarks = await AggregationMarks.findOne({
            where: { studentId: id }
        });

        const data = {
            id: student.id,
            name: student.name,
            rollNumber: student.rollNumber,
            studentCardId: student.studentCardId,
            standard: student.standard,
            email: student.email,
            phone: student.phone,
            resultMark: aggregateMarks?.resultMark || 0,
            updatedAt: student.updatedAt,
            createdAt: student.createdAt,
        };

        return res.status(200).json({
            success: true,
            data,
            message: "student updated successfully"
        });

    } catch (error) {
        console.error("message: ", error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        });
    }
};

export const deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "student id is required"
            });
        }

        // Check if student exists
        const student = await Students.findByPk(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "student not found"
            });
        }

        // 1️⃣ Delete all subject marks for the student
        await StudentMarks.destroy({
            where: { studentId: id }
        });

        // 2️⃣ Delete aggregation marks
        await AggregationMarks.destroy({
            where: { studentId: id }
        });

        // 3️⃣ Delete student
        await Students.destroy({
            where: { id }
        });

        return res.status(200).json({
            success: true,
            message: "student and related marks deleted successfully"
        });

    } catch (error) {
        console.error("delete error:", error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        });
    }
};

export const getAllStudents = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      standard,
      sortBy = "createdAt",  // default sorting field
      sortOrder = "DESC",     // ASC or DESC
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // 🔎 Search conditions
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { studentCardId: { [Op.iLike]: `%${search}%` } },
        { rollNumber: { [Op.eq]: search } } // exact match for rollNumber
      ];
    }

    // 🎓 Filter by standard
    if (standard) {
      whereClause.standard = standard;
    }

    const offset = (page - 1) * limit;

    // 🏆 Sorting logic
    const validSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const { rows, count } = await Students.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: [[sortBy, validSortOrder]],
    });

    return res.status(200).json({
      success: true,
      totalRecords: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      sortBy,
      sortOrder: validSortOrder,
      data: rows,
    });

  } catch (error) {
    console.error("Get All Students Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getStudent = async(req,res) => {
    try {
        const {id}= req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "student id is required"
            });
        }

        const student = await Students.findByPk(id);
        if(!student){
            return res.status(404).json({
                success: false,
                message: "student not found"
            });
        }

        return res.status(200).json({success:true,student,message:"student data fetch successfully"});

    } catch (error) {
         return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        });
    }
}