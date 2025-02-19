import cors from 'cors';
import express from 'express';
import { connectDb } from './connection/db.js';
import productRouter from './routes/productRoute.js';


const app = express();
const port = 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post("/api/product/add", (req, res) => {
//     console.log(req.body);
// })

app.use("/api", productRouter)
connectDb() 

app.listen(port, () => console.log("server started"));