import { createContext, use, useContext, useState } from "react";
import axios from "axios";

export const dataContext = createContext();

function DataProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [singleProductByCat, setSingleProductByCat] = useState([]);
    // const [similiarProduct, setSimiliarProduct] = useState([]);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product");
            setProducts(response.data);
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
            const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/categories/all");
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
            const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/?category=" + category)
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

    return (
        <dataContext.Provider
            value={{
                products,
                cart,
                loading,
                categories,
                singleProductByCat,
                // similiarProduct,
                fetchData,
                addToCart,
                existInCart,
                removeFromCart,
                updateProductQuantity,
                fetchCategories,
                productFilterByCategory,
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
