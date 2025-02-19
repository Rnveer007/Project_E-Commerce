import express from 'express';
import { addToProduct } from '../controller/product.js';

const productRouter = express.Router();

productRouter.post("/product/add", addToProduct)
export default productRouter;