import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    usualPrice: {
        type: Number,
        required: true
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