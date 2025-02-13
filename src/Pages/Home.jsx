import { useContext, useEffect } from "react"
import {dataContext} from "../Context/DataProvider"

function Home() {
  const { fetchData } = useContext(dataContext)

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div>Home</div>
  )
}

export default Home