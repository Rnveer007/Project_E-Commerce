import uploadToCloudinary from "../middleware/cloudinary.js";
import categoryModel from "../models/categoryModel.js";
import productData from "../models/productModel.js";

export async function addToProduct(req, res) {
    // console.log(req.file)
    try {
        const file = req.file;
        if (!file) return res.status(404).send({ message: "File Not Found" })
        const secure_url = await uploadToCloudinary(req)
        const latestProduct = new productData({ ...req.body, image: secure_url })
        await latestProduct.save()
        res.status(201).send({ message: "product Added" })
    } catch (error) {
        res.status(500).send({ message: "product not found", error: error.message })
    }
};

export async function fetchProducts(req, res) {
    // console.log("Ranveer")
    try {
        let query = {};
        if (req.query.category) {
            query.category = {$regex: new RegExp(`^${req.query.category}$`, "i")}
        }

        const products = await productData.find(query)
        // console.log(products)
        res.send(products)
    } catch (error) {
        res.status(500).send({ message: "product not found", error: error.message })
    }
}

export async function fetchCategories(req, res) {
    try {
        const category = await categoryModel.find({})
        res.send(category)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
}

export async function addCategory(req, res) {
    try {
        const file = req.file;
        if (!file) return res.status(404).send({ message: "File Not Found" })
        const secure_url = await uploadToCloudinary(req)
        const newCategory = new categoryModel({ ...req.body, image: secure_url })
        await newCategory.save()
        res.status(201).send({ message: "category Added" })
    } catch (error) {
        res.status(500).send({ message: "category not found", error: error.message })

    }
}