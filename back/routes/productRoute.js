import express from 'express';
import { addToProduct, fetchCategories, fetchProducts, addCategory } from '../controller/product.js';
import { upload } from "../middleware/multer.js"
import AddCategory from '../../front/src/admin/AddCategory.jsx';

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addToProduct);
productRouter.get("/get", fetchProducts);
productRouter.get("/category", fetchCategories);
productRouter.get("/category/add", upload.single("image"), addCategory);

export default productRouter;