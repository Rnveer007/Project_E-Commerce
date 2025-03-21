import { useContext, useEffect } from "react"
import { dataContext, useEcom } from "../Context/DataProvider"
import { Link, NavLink, useParams } from "react-router-dom"
import Loader from "../Components/Loader"
import DisplayProducts from "../Components/DisplayProducts"

function Home() {
  const { products, loading, categories, fetchData, productFilterByCategory, singleProductByCat, setSingleProductByCat
  } = useEcom()

  const params = useParams();

  //  console.log(categories)
  useEffect(() => {
    fetchData();
    if (Object.keys(params).length > 0) {
      if (params.categoryName) productFilterByCategory(params.categoryName);
    }
    else setSingleProductByCat([])
  }, [params])

  // console.log(singleProductByCat)

  return <>
    <div className="flex justify-center">
      <div className=" border-r-2 border-gray-300 px-3 w-[25%]">
        <h1 className="my-3 pl-3 text-2xl font-bold">Categories</h1>
        <ul className="py-2 text-sm text-gray-700 capitalize mt-2">
          <li>
            <NavLink to={`/`} className={({ isActive }) =>
              `block px-4 rounded py-3 font-bold text-xl cursor-pointerdark:hover:text-blue-500 ${isActive ? 'bg-blue-500 text-white rounded' : 'dark text-gray-700'
              }`
            }>All</NavLink>
          </li>
          {categories?.length > 0 &&
            categories?.map((category, index) => (
              <NavLink
                key={index}
                to={`/category/${category?._id}`}
                className={({ isActive }) =>
                  `block px-4 py-3 font-bold text-xl dark:hover:rounded dark:hover:bg-gray-100 dark:hover:text-blue-500 ${isActive ? 'bg-blue-500 rounded text-white' : 'dark text-gray-700'
                  }`
                }
              >
                {category.name}
              </NavLink>
            ))}
        </ul>
      </div>
      <div className="w-[60%]">
        <div className="pl-8">
          <h1 className='text-2xl font-bold my-8'>Products</h1>
          <div>
            <input type="search" name="" id="" placeholder='Search Products...' className='border-1 mb-8 w-[350px] py-2 px-3 rounded' />
          </div>
        </div>
        <DisplayProducts products={
          singleProductByCat.length === 0 && Object.keys(params).length === 0
            ? products
            : singleProductByCat
        } />
      </div>
    </div>
  </>
}

export default Home