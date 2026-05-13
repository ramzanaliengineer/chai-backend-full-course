import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import connectDB from "./db/index.js";



dotenv.config();

const app = express();

connectDB()
  .then(()=>{
    app.listen(process.env.PORT || 8000 , () =>{
      console.log(`server is running at port:${process.env.PORT}`);
    })
    
  })
  .catch((error) => {
    console.log("MONGO DB CONECTION FAILED",error);
    
  })


    // app.listen(process.env.PORT || 8000, () => {
    //   console.log(`Server running on port ${process.env.PORT}`);
    // });
  