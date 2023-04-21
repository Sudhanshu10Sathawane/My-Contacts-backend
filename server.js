const express=require("express");
const dotenv=require("dotenv").config();
const contactRoute=require('./routes/contactRoutes');
const userRoutes=require('./routes/userRoutes')
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
connectDb();
const app=express();
const port=process.env.PORT || 5000;
//For Parsing body request
app.use(express.json());
app.use("/api/contacts",contactRoute);
//For Authentication
app.use("/api/users",userRoutes);
//For handling error
app.use(errorHandler);
app.listen(port, ()=>{
    console.log('Server Running on port',port);
});