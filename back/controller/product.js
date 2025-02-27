import productData from "../models/productModel.js";

export async function addToProduct(req, res) {
    console.log(req.file)
    try {
        const latestProduct = new productData({ ...req.body, image: req.file.path });
        await latestProduct.save()
        res.status(201).send({ message: "product Added" })
    } catch (error) {
        res.status(500).send({ message: "product not found", error: error.message })
    }
};

export async function fetchProducts(req, res) {
    console.log("Ranveer")
    try {
        const products = await productData.find({})
        console.log(products)
        res.send(products)
    } catch (error) {
        res.status(500).send({ message: "product not found", error: error.message })
    }
}