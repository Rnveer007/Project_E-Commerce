import mongoose from "mongoose";

export async function connectDb() {
    await mongoose.connect("mongodb + srv://RanveerSingh:bVR5NN4Mbfgw9B4j@cluster0.lceek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}