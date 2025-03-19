import { createContext, useContext, useState } from "react";
import instance from "../axiosConfig";
import { useAuth } from "./AuthProvider";
// import axios from "axios";

export const dataContext = createContext();

function DataProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [singleProductByCat, setSingleProductByCat] = useState([]);
    const [dealProducts, setDealProducts] = useState([]);

    const { isAdminLoggedIn } = useAuth();
    // console.log(isAdminLoggedIn)

    async function fetchData(page = null) {
        try {
            // if (isAdminLoggedIn) page = 1;
            setLoading(true);
            const response = await instance.get(
                isAdminLoggedIn ? `/product/get?page=1` : "/product/get",
                { withCredentials: true }
            )
            setProducts(response.data);
            // console.log(response.data.products)
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    // Handle Product/Category Delete
    async function handleDelete(idToDelete, whatToDelete) {
        console.log("Deleting ID:", idToDelete);
        try {
            const response = await instance.delete(`/product/${idToDelete}`,
                { withCredentials: true })

            if (response.status === 200)
                window.location.href =
                    whatToDelete === "product" ? "/admin/products"
                        : "/admin/productCategory"
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch All Categories
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



    // Filter Products by Category
    async function productFilterByCategory(category) {
        try {
            setLoading(true)
            setSingleProductByCat([]);
            // const response = await axios.get("https://ecommerce-api-8ga2.onrender.com/api/product/?category=" + category)
            const response = await instance.get("/product/get/?category=" + category)
            setSingleProductByCat(response.data.products)
            // console.log(response.data.products)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    // async function addToCart(product) {
    //     try {
    //         const response = await instance.post("/cart/add",
    //             { product: product?._id, quantity: 1 },
    //             { withCredentials: true });

    //         console.log("cart update", response.data);

    //     } catch (error) {
    //         console.log("product are not added to cart ", error);
    //     }
    // }

    // Add Product to Cart (Fixed)
    function addToCart(product) {
        setCart((prev) => {
            const existingItem = prev.find((item) => item?._id === product?._id);
            if (existingItem) {
                // Increase quantity if item already exists
                return prev.map((item) =>
                    item?._id === product?._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Add new product to the cart with quantity 1
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    // Check if Product Exists in Cart
    function existInCart(productId) {
        return cart.some((cartItem) => cartItem?._id === productId);
    }

    // Remove Product from Cart  
    function removeFromCart(productId) {
        setCart((prev) => prev.filter((cartItem) => cartItem?._id !== productId));
    }

    // Update Product Quantity in Cart
    function updateProductQuantity(productId, sign) {
        if (!existInCart(productId)) {
            alert("Incorrect Id");
            return;
        }
        setCart((prev) =>
            prev
                .map((cartItem) =>
                    cartItem?._id === productId
                        ? {
                            ...cartItem,
                            quantity:
                                sign === "+"
                                    ? cartItem.quantity + 1
                                    : Math.max(cartItem.quantity - 1, 1), // Prevent quantity from going below 1
                        }
                        : cartItem
                )
                .filter((item) => item.quantity > 0) // Remove item if quantity becomes 0
        );
    };


    // Fetch Hot Deals
    async function fetchHotDeals() {
        try {
            const response = await instance.get("/deals",
                { withCredentials: true })
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
                fetchHotDeals,
                handleDelete,
            }}
        >
            {children}
        </dataContext.Provider>
    );

}

// Custom Hook to Use Ecom Context
export function useEcom() {
    return useContext(dataContext);
}
export default DataProvider;
