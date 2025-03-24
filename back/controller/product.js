import uploadToCloudinary from "../middleware/cloudinary.js";
import categoryModel from "../models/categoryModel.js";
import productData from "../models/productModel.js";
import mongoose from "mongoose";

export async function addToProduct(req, res) {
    // console.log(req.file)
    try {
        const file = req.file;
        if (!file) return res.status(404).send({ message: "File Not Found" })
        const secure_url = await uploadToCloudinary(req)
        const categoryObjId = new mongoose.Types.ObjectId(req.body.category)

        const latestProduct = new productData({ ...req.body, image: secure_url, category: categoryObjId })
        await latestProduct.save()
        res.status(201).send({ message: "product Added" })
    } catch (error) {
        res.status(500).send({ message: "product not found", error: error.message })
    }
};

export async function addCategory(req, res) {
    try {
        const file = req.file;
        if (!file) return res.status(404).send({ message: "File Not Found" })

        //CHECKING IF CATEGORY ALREADY EXISTS
        const exists = await categoryModel.find({ name: req.body.name });
        if (exists.length > 0)
            return res.status(400).send({ message: "Category Already Exists" });

        //UPLOADING CATEGORY ICON
        const secure_url = await uploadToCloudinary(req)

        const newCategory = new categoryModel({ ...req.body, image: secure_url })
        await newCategory.save()

        res.status(201).send({ message: "category Added" })
    } catch (error) {
        res.status(500)
            .send({ message: "category not found", error: error.message })
    }
}

export async function fetchProducts(req, res) {
    try {
        let query = {};
        if (req.params.id) {
            // query._id = req.params.id;
            query.slug = req.params.id
        }

        if (req.query.categoryName) {
            const category = await categoryModel.find({
                name: { $regex: new RegExp(`^${req.query.categoryName}$`, "i") },
            });
            query.category = category[0]._id;
        }


        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = Number(req.query.limit) === -1 ? 0 : 10;
        const skip = (page - 1) * limit;


        const products = await productData.find(query)
            .skip(skip)
            .limit(limit)
            .populate("category");
        const TotalCount = await productData.countDocuments(query);

        // console.log(products);

        if (!products) {
            return res.status(500).send({ message: "No products Data found" });
        }

        res.send({
            products,
            currentPage: page,
            totalPage: Math.ceil(TotalCount / limit),
        });
    } catch (error) {
        res.status(500).send({
            message: "Couldn't fetch Product not added",
            Error: error.message,
        });
    }
}


export async function fetchCategories(req, res) {
    try {
      let query = {};
  
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const category = await categoryModel.find(query).skip(skip).limit(limit);
  
      const totalCount = await categoryModel.countDocuments(query);
  
      if (!category)
        return res.status(400).send({ message: "No Categories found" });
  
      res.send({
        category,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

export async function hotDeals(req, res) {
    try {
        const hotDeals = await productData.find(
            {
                discountPrice: { $gte: 500 }
            })
        console.log(hotDeals)
        res.status(200).json(hotDeals)
    } catch (error) {
        console.error("Error fetching hot deals:", error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteProductOrCategory(req, res) {
    try {
        const { id } = req.params
        console.log("Trying to delete ID:", id);


        if (!id) return res.status(400).send({ message: "No ID Found" });

        let whatToDelete;

        whatToDelete = await productData.findByIdAndDelete(id);

        if (!whatToDelete) {
            whatToDelete = await categoryModel.findByIdAndDelete(id);
        }

        if (!whatToDelete)
            return res.status(400)
                .send({ message: "Could not delete the selected resource" })

        return res.send({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ message: error.message })
    }
}