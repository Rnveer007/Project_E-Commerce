import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        unique : true,
        required: true,
    },
    image: {
        type: String,
    },
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        }
    ]
})


const User = mongoose.model("user", userSchema);
export default User