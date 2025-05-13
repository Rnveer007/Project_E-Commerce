import express from "express";
import { addToCart, fetchCart } from "../controller/cart.js";
import { checkUser } from "../middleware/auth.js";

const cartRouter = express.Router()

cartRouter.get("/fetchCart",checkUser, fetchCart);
cartRouter.post('/add',checkUser, addToCart);


export default cartRouter;