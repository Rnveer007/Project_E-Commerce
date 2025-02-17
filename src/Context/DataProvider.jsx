import { createContext, useState } from "react";
import instance from '../axiosConfig';
import { FaLeaf } from "react-icons/fa";

export const dataContext = createContext();

function DataProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCotegories] = useState([]);
    const [singleCatProduct, setSingleCatProduct] = useState([]);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await instance.get("/product");
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
            const response = await instance.get("/product/categories/all");
            setCotegories(response.data);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    async function productFilterByCategory() {
        try {
            setLoading(true)
            setSingleCatProduct([]);
            const response = await instance.get("/product/?category=" + category)
            setSingleCatProduct(response.data)
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
                singleCatProduct,
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

export default DataProvider;
