import express from "express";
import { addToCart, fetchCart } from "../controller/cart";


const cartRouter = express.Router()

cartRouter.get("/fetchCart", fetchCart);
cartRouter.post('/add', addToCart);


export default cartRouter;