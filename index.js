import app from "./src/app.js";
import sequelize from "./config/db.js";



sequelize.sync().then(()=>{
    console.log("Database synchronized");
})
.catch((err)=>{
    console.error("Error synchronizing database:",err);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on port testing ${PORT}`);
});
