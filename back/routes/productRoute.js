import express from 'express';
import { addToProduct, fetchProducts } from '../controller/product.js';
import { upload } from "../middleware/multer.js"

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addToProduct);
productRouter.get("/get", fetchProducts);
export default productRouter;