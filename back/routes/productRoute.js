import express from 'express';
import { addToProduct } from '../controller/product.js';
import { upload } from "../middleware/multer.js"

const productRouter = express.Router();

productRouter.post("/product/add", upload.single("image"), addToProduct);
export default productRouter;