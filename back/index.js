import cors from 'cors';
import "dotenv/config"

import express from 'express';
import { connectDb } from './connection/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import dealRouter from './routes/dealRoutes.js';
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

// app.post("/api/product/add", (req, res) => {
//     console.log(req.body);
// })

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/deals", dealRouter);

connectDb()

app.listen(port, () => console.log("server started"));