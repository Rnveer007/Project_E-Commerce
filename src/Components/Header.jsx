import { Link } from "react-router-dom"

 
function Header() {
  return (
    <>
      <div className="flex justify-between px-16 py-3 mb-4">
        <h1> E-Commerce</h1>
        <ul className="flex gap-12">
          <li> <Link to="/">Home</Link> </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Header