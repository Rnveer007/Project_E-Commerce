// import { createContext, useState } from "react";
// import intance from '../axiosConfig';

// export const dataContext = createContext()

// function DataProvider({ Children }) {
//     const [products, setProducts] = useState([])
//     const [cart, setCart] = useState([])
//     const [loading, setLoading] = useState(false)


//     async function fetchData() {
//         try {
//             setLoading(true)
//             const responce = await intance.get("/product");
//             console.log(responce.data)
//             setProducts(responce.data)
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         } finally {
//             setLoading(false)
//         }
//     }
//     return (
//         <dataContext.Provider value={{ products, cart, loading, fetchData }}>
//             {Children}
//         </dataContext.Provider>
//     )
// }

// export default DataProvider