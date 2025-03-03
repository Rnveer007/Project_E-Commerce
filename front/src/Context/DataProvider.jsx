import { createContext, useContext, useState } from "react";
import instance from "../axiosConfig";
// import axios from "axios";

export const dataContext = createContext();

function DataProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [singleProductByCat, setSingleProductByCat] = useState([]);
    const [dealProducts, setDealProducts] = useState([]);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await instance.get("/product/get", { withCredentials: true });
            setProducts(response.data);
            // console.log(response.data)
            console.log("ranveer " + response.data)
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    async function fetchCategories() {
        try {
            setLoading(true)
            // const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/categories/all");
            const response = await instance.get("/product/category");
            setCategories(response.data);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    async function productFilterByCategory(category) {
        try {
            setLoading(true)
            setSingleProductByCat([]);
            // const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/?category=" + category)
            const response = await instance.get("/product/get/?category=" + category)
            setSingleProductByCat(response.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    function addToCart(product) {
        if (existInCart(product._id)) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.product._id === product._id
                        ? { ...cartItem, quantity: Number(cartItem.quantity) + 1 }
                        : cartItem
                )
            );
        } else {
            const cartObj = { product, quantity: 1 };
            setCart([...cart, cartObj]);
        }
    }

    function existInCart(productId) {
        return cart.some((cartItem) => cartItem.product._id === productId);
    }

    function removeFromCart(productId) {
        setCart(cart.filter((cartItem) => cartItem.product._id !== productId));
    }

    function updateProductQuantity(productId, sign) {
        if (!existInCart(productId)) {
            alert("Incorrect Id");
            return;
        }
        setCart(
            cart
                .map((cartItem) =>
                    cartItem.product._id === productId
                        ? { ...cartItem, quantity: cartItem.quantity + (sign === "+" ? 1 : -1) }
                        : cartItem
                )
        );
    }


    async function fetchHotDeals() {
        try {
            const response = await instance.get("/deals", { withCredentials: true })
            // console.log(response.data)
            setDealProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <dataContext.Provider
            value={{
                products,
                cart,
                loading,
                categories,
                singleProductByCat,
                dealProducts,
                // similiarProduct,
                fetchData,
                addToCart,
                existInCart,
                removeFromCart,
                updateProductQuantity,
                fetchCategories,
                productFilterByCategory,
                fetchHotDeals
            }}
        >
            {children}
        </dataContext.Provider>
    );

}

export function useEcom() {
    return useContext(dataContext);
}
export default DataProvider;
