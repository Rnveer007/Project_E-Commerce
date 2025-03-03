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

  return (loading) ?<Loader/>:<DisplayProducts products={products} />;
  
}

export default Home