import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { dataContext } from "../Context/DataProvider";

function Header() {
  const { cart, categories, fetchCategories } = useContext(dataContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="flex justify-between px-16 py-3 mb-4 bg-amber-200 relative">
      <h1 className="font-bold text-xl">E-Commerce</h1>
      <ul className="flex gap-12 items-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li className="relative">
          <Link to="/cart"><FaShoppingCart className="text-xl" /></Link>
          <p className="absolute -top-3 -right-7 text-white bg-red-600 w-[25px] h-[25px] flex justify-center items-center text-sm border-2 rounded-full">
            {cart?.length > 0 ? cart.length : 0}
          </p>
        </li>


        {/* Dropdown Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          ShopByCategory
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-16 top-14 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
            <ul className="py-2 text-sm text-gray-700">
              {
                categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <a key={index} href={`/category/${category.category.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      {category.category}
                    </a>
                  )
                })

              }
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Header;
