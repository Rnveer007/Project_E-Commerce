import { useContext, useEffect } from "react"
import { dataContext } from "../Context/DataProvider"
import { Link } from "react-router-dom"

function Home() {
  const { products, loading, fetchData } = useContext(dataContext)
  console.log(products)

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
              <Link to={`/product/${item._id}`}> <img src={item.url} alt="" className=" w-[300px] h-[300px] object-contain" /></Link>
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