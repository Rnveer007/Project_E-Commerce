import mongoose from "mongoose";
import 'dotenv/config'

export async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI);
    // await mongoose.connect("mongodb+srv://RanveerSingh:bVR5NN4Mbfgw9B4j@cluster0.lceek.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
}