import sequelize from "../../../../config/db.js";
import { DataTypes } from "sequelize";

const Students = sequelize.define("Students",{
    id:{
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rollNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    studentCardId: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    standard: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    modelName: "Students",
    timestamps: true,
    tableName: "Students"
})

export default Students;