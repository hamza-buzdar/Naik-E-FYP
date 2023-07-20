import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoute from "./routes/userRoute.js";
import needRoute from "./routes/needRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import processrequestRoute from "./routes/processrequestRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import chatRoute from "./routes/chatRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";





const app = express()
dotenv.config()


const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials:true}));





app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/needs", needRoute);
app.use("/api/processrequests", processrequestRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/chats", chatRoute);
app.use("/api/reviews", reviewRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});



app.listen(8800, () => {
    connect();
    console.log("Backend server is running!");
  });
