import productData from "../models/productModel";

export async function addToProduct(req, res) {
    try {
        const latestProduct = new productData(req.body)
        await latestProduct.save()
        res.status(201).send({ message: "product Added" })
    } catch (error) {
        res.status(500).send({ message: "product not found", error: error.message })
    }
};