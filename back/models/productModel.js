import mongoose from "mongoose";


// Schema is a blueprint of how data will be stored in the database.
// Mongoose is a third party package that allows us to interact with MongoDB
// It is an object Data modeling (ODM) library for mongodb and nodejs.
// Model is a class with which we construct documents.


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: {},
        required: true
    },
    usualPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: String,
        required: true,
    },
    discountPrice: {
        type: Number
    },
    image: {
        type: String,
        required: true,
    }
})

const productData = mongoose.model("product", productSchema);
export default productData