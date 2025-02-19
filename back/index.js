import express from 'express';
import cors from 'cors';
import { connectDb } from './connection/db.js';
import productRouter from './routes/productRoute.js';


const port = 4000;
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// app.post("/api/product/add", (req, res) => {
//     console.log(req.body);
// })

app.use("/api", productRouter)
connectDb()

app.listen(port, () => console.log("server started"));