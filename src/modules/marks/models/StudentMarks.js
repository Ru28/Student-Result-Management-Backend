import { DataTypes } from "sequelize";
import sequelize from "../../../../config/db.js";

const StudentMarks = sequelize.define("StudentMarks",{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.UUID,
        references: {
            model: "Students",
            key:"id"
        },
        allowNull: false,
    },
    subjectName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subjectMark: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    modelName: "StudentMarks",
    timestamps: true,
    tableName: "StudentMarks"
})

export default StudentMarks;