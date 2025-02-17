import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react"
import { dataContext } from "../Context/DataProvider";




function Header() {
  const { cart } = useContext(dataContext);
  return (
    <>
      <div className="flex justify-between px-16 py-3 mb-4 bg-amber-200">
        <h1 className="font-bold text-xl"> E-Commerce</h1>
        <ul className="flex gap-12 items-center">
          <li> <Link to="/">Home</Link> </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li className="relative"><Link to="/cart"><FaShoppingCart className="text-xl" />
          </Link></li>
        </ul>
        <p className="absolute right-10 top-0 text-white bg-red-600 w-[25px] h-[25px] text-center items-center block border-2 rounded-full ">{cart.length > 0 ? cart.length : 0} </p>
      </div>
    </>
  )
}

export default Header