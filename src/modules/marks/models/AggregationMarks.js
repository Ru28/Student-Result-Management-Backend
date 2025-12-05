import { DataTypes } from "sequelize";
import sequelize from "../../../../config/db.js";

const AggregationMarks = sequelize.define("AggregationMarks",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    studentId: {
        type: DataTypes.UUID,
        references: {
            model: "Students",
            key:"id"
        },
        allowNull: false,
    },
    resultMark: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }
},{
    modelName: "AggregationMarks",
    timestamps: true,
    tableName: "AggregationMarks",
})

export default AggregationMarks;