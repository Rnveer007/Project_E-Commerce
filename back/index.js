import express from 'express';
import cors from 'cors';

const port = 4000;
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.post("/api/product/add", (req, res) => {
    console.log(req.body);
})

app.listen(port, () => console.log("server started"));