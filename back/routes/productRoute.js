import express from 'express';
import { addToProduct, fetchCategories, fetchProducts, addCategory, deleteProductOrCategory } from '../controller/product.js';
import { upload } from "../middleware/multer.js"

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addToProduct)
productRouter.get("/get", fetchProducts)
productRouter.get("/get/:id", fetchProducts)
productRouter.get("/category", fetchCategories)
productRouter.post("/category/add", upload.single("image"), addCategory)
productRouter.delete("/:id", deleteProductOrCategory)

export default productRouter;