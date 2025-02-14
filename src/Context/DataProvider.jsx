import { createContext, useState } from "react";
import instance from '../axiosConfig';

export const dataContext = createContext()

function DataProvider({ children }) {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        try {
            setLoading(true)
            const responce = await instance.get("/product");
            console.log(responce.data)
            setProducts(responce.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)

        }
    }


    function addToCart(product) {
        const cartObj = { product, quantity: 1 };
        setCart([...cart, cartObj])


    }
    console.log(cart)

    return (
        <dataContext.Provider value={{ products, cart, loading, cart, fetchData, addToCart }}>
            {children}
        </dataContext.Provider>
    )
}

export default DataProvider