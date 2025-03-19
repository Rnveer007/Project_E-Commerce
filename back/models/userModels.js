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
        unique: true,
        required: true,
    },
    image: {
        type: String,
    },
    role:
    {
        type: String,
        default: "user",
    }
})


const User = mongoose.model("user", userSchema);
export default User