import express from 'express';
import { addToProduct } from '../controller/product.js';
import { upload } from "../middleware/multer.js"

const productRouter = express.Router();

productRouter.post("/product/add", upload, addToProduct);
export default productRouter;