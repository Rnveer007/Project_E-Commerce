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
        if (req.params.id) {
            query._id = req.params.id
        }
        if (req.query.category) {
            const categoryId = await categoryModel.find({
                name: { $regex: new RegExp(`^${req.query.category}$`, "i") }
            });
            query.category = categoryId
            // query.category = { $regex: new RegExp(`^${req.query.category}$`, "i") }
        }

        // const page = parseInt(req.query.page) || 1;  //default page 1  
        // const limit = parseInt(req.query.limit) || 10; // default 10 items per page

        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = 3;
        const skip = (page - 1) * limit

        const products = await productData.find(query)
            .skip(skip)
            .limit(limit)
            .populate('category');

        const totalCounts = await productData.countDocuments(query) // Get total count for pagination info

        if (!products)
            return res.status(400).send({ message: "No Product Found" })
        // console.log(products)

        res.send({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalCounts / limit)
        })
    } catch (error) {
        res.status(500).send({ message: "could not fetch product", error: error.message })
    }
}

export async function fetchCategories(req, res) {
    try {
        let query = {}

        const page = req.query.page ? Number(req.query.page) : 1
        const limit = 10;
        const skip = (page - 1) * limit;

        const category = await categoryModel.find(query)
            .skip(skip).limit(limit)
        const totalCount = await categoryModel.countDocuments(query);

        if (!category)
            return res.status(400).send({ message: "No Categories found" });

        res.send({
            category,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
        });
        // const category = await categoryModel.find({})
        // res.send(category)
    } catch (error) {
        // console.log(error)
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

// export async function deleteProductOrCategory(req, res) {
//     try {
//         const { id } = req.params
//         console.log("Trying to delete ID:", id);


//         if (!id) return res.status(400).send({ message: "No ID Found" });

//         let whatToDelete;

//         whatToDelete = await productData.findByIdAndDelete(id);

//         if (!whatToDelete) {
//             whatToDelete = await categoryModel.findByIdAndDelete(id);
//         }

//         if (!whatToDelete)
//             return res.status(400)
//                 .send({ message: "Could not delete the selected resource" })

//         return res.send({ message: "Deleted successfully" });
//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).send({ message: error.message })
//     }
// }


export async function deleteProduct(req, res) {
    const { id } = req.body;

    if (!id) return res.status(400).send({ message: "No ID Found" });

    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory)
        return res.status(400).send({ message: "No category with this ID found" });
}


export async function deleteCategory(req, res) { }