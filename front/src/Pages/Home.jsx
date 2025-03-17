import { useContext, useEffect } from "react"
import { dataContext, useEcom } from "../Context/DataProvider"
import { Link } from "react-router-dom"
import Loader from "../Components/Loader"
import DisplayProducts from "../Components/DisplayProducts"

function Home() {
  const { products, loading, fetchData } = useEcom()
  // console.log(products)

  useEffect(() => {
    fetchData()
  }, [])

  return <>
    <div className="flex justify-center">
      <div className="border-1 border-gray-300 w-[25%]"><h1>Categories will show Here</h1></div>
      <div className="w-[60%]"><DisplayProducts products={products} /></div>
    </div>
  </>

}

export default Home