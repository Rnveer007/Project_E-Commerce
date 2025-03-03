import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        }
    ],
    role:
    {
        type: String,
        default: "admin",
    }

})


const Admin = mongoose.model("Admin", adminSchema);
export default Admin