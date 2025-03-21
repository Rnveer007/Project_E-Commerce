import cors from 'cors';
import "dotenv/config"

import express from 'express';
import { connectDb } from './connection/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import dealRouter from './routes/dealRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import cartRouter from './routes/cartRoutes.js';
// import bcrypt from "bcrypt"

// console.log(await bcrypt.hash("123456", 10))
// import cookieParser from 'cookie-parser';

const port = process.env.PORT;
const app = express();

// app.use(cors({ origin: process.env.FRONTEND_URI }));

const corsOptinos = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    method: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
}

app.use(cors(corsOptinos));
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/deals", dealRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);


connectDb()

app.listen(port, () => console.log("server started"));