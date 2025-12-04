import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: (msg)=> console.log(`Squelize Query:${msg}`), 
}

const sequelize = new Sequelize(config);

sequelize.authenticate()
    .then(()=>{
        console.log("Database connection has been established successfully.");
        console.log("Successfull connection");
    })
    .catch((error)=>{
        console.error("Unable to connect to the database:",error);
    });

export default sequelize;
