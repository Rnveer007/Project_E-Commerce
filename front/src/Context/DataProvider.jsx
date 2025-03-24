import { createContext, useContext, useState } from "react"; // create and use context are react hooks used to manage and consume context.
import instance from "../axiosConfig";
import { useAuth } from "./AuthProvider";
// import axios from "axios";

export const dataContext = createContext(); //created a context called dataContext which  will be used to share state and functions across the app without passing props manually.

function DataProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [singleProductByCat, setSingleProductByCat] = useState([]);
    const [dealProducts, setDealProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState([]);

    async function fetchData(page = null) {
        try {
            setLoading(true);
            const response = await instance.get(
                page ? `/product/get?page=1` : "/product/get",
                { withCredentials: true }
            )
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    async function fetchSingleProduct(id) {
        try {
            const response = await instance.get(`/product/get/${id}`)
            // setSingleProduct(response.data.products[0])
            return response.data.products[0]
        } catch (error) {
            console.log(error)
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
            const response = await instance.get("/product/category");
            // setCategories(response.data);
            return response.data;
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    // Filter Products by Category
    async function productFilterByCategory(category, isName = false) {
        try {
            setLoading(true)
            // setSingleProductByCat([]);
            // const response = await instance.get("/product/get/?category=" + category)
            // setSingleProductByCat(response.data.products)

            const url = isName
                ? "/product/get/?categoryName="
                : "/product/get/?category=";
            const response = await instance.get(url + category);
            return response.data;
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    async function addToCart(product) {
        try {
            const response = await instance.post("/cart/add",
                { product: product?._id, quantity: 1 },
                { withCredentials: true });

            console.log("cart update", response.data);

        } catch (error) {
            console.log("product are not added to cart ", error);
        }
    }


    // Check if Product Exists in Cart
    function existInCart(productId) {
        const productAlreadyExist = cart.find((cartItem) => cartItem.product._id === productId)
        return productAlreadyExist ? true : false
    }

    // Remove Product from Cart  
    function removeFromCart(productId) {
        setCart(cart.filter((cartItem) => cartItem?._id !== productId));
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
                singleProduct,
                loading,
                categories,
                singleProductByCat,
                dealProducts,
                fetchData,
                addToCart,
                existInCart,
                removeFromCart,
                updateProductQuantity,
                fetchCategories,
                productFilterByCategory,
                fetchHotDeals,
                handleDelete,
                fetchSingleProduct,
                setSingleProductByCat
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
