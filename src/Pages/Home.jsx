import { useContext, useEffect, useState } from "react"
// import {dataContext} from "../Context/DataProvider"
import instance from '../axiosConfig'

function Home() {
  // const { fetchData } = useContext(dataContext)
  const [products, setProducts] = useState([])
  // const [cart, setCart] = useState([])
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
  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <h3>Loading...</h3>;
  return (
    <div className="flex flex-wrap gap-20 justify-center">
      {
        products.map((item) => {
          return (
            <div key={item._id} className=" text-center ">
              <img src={item.url} alt="" className=" w-[300px] h-[300px] object-contain" />
              <h1 className=" my-4">{item.name.split(" ").slice(0, 5).join(" ") + "..."}</h1>
              <p className=" my-4">$ {item.price} </p>
              <button className="border-2 px-3 py-1 mx-3 cursor-pointer bg-cyan-300 border-cyan-50 font-bold hover:transition-all hover:text-white hover:bg-black">Add to Wishlist</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home