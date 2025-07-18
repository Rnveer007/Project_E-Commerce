import cors from 'cors';
import "dotenv/config"
import express from 'express';
import { connectDb } from './connection/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import dealRouter from './routes/dealRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import cartRouter from './routes/cartRoutes.js';

const port = process.env.PORT;
const app = express();

// app.use(cors({ origin: process.env.FRONTEND_URI }));

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
}

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/deals", dealRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);


connectDb()

app.listen(port, () => console.log(` Server started on port ${port}`));