import { useEffect, useState } from "react"
import { useEcom } from "../Context/DataProvider"
import { NavLink, useParams } from "react-router-dom"
import DisplayProducts from "../Components/DisplayProducts"

function Home() {
  const { fetchCategories, productFilterByCategory, fetchData } = useEcom()
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([])
  const [productsByCat, setProductsByCat] = useState({})


  const params = useParams();

  useEffect(() => {
    initial();
  }, []);

  useEffect(() => { getProductsByCat(); }, [params])

  async function getProductsByCat() {
    const productsByCat = await productFilterByCategory(params.categoryName, true);
    setProductsByCat(productsByCat)
  }

  async function initial() {
    const categories = await fetchCategories();
    const products = await fetchData();
    setCategories(categories.category);
    setProducts(products);
  }

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
          {categories.length > 0 &&
            categories.map((category, index) => (
              <NavLink
                key={index}
                to={`/category/${category.name}`}
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
        <DisplayProducts product={
          productsByCat?.products?.length > 0 ? productsByCat :
            products

        } />
      </div>
    </div>
  </>
}

export default Home