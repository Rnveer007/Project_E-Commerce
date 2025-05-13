import cartModel from "../models/cartModel.js";

export async function fetchCart(req, res) {
    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ user: userId }).populate("items.product")
        if (!cart) {
            return res.status(200).send({ message: "cart is empty", items: [] })
        }
        res.status(200).send(cart)
    } catch (error) {
        console.log(error)
    }

}

export async function addToCart(req, res) {
    try {
        const userId = req.user._id;
        const { product, quantity } = req.body;

        // console.log("product", product);
        
        let cart = new cartModel({ user: userId, items: [] })

        if (!cart) {
            cart = new cartModel({ user: userId, items: [] })
        }
        // const exitingItem = CacheStorage.items.find(items.product.tostring() === product)
        const exitingItem = cart.items.find(items.product.tostring() === product)

        if (exitingItem) {
            exitingItem.quantity += quantity;
        } else {

            cart.items.push({ product, quantity })
        }

        await cart.save()

        const updateCart = await cartModel.findOne({ user: userId }).populate("items.product")
        res.status(200).send({ updateCart })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Problem adding product to cart" })
    }

}