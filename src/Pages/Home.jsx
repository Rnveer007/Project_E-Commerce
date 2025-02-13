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
            <div key={item._id} className="w-[300px] h-[300] ">
              <img src={item.url} alt="" className=" object-cover" />
              <h1>{item.name}</h1>
              <p> {item.price} </p>

              <button>Add to Cart</button>
              <button>Add to Wishlist</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home