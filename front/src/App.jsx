import { createBrowserRouter, RouterProvider } from "react-router-dom"
import First from "./First"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Cart from "./Pages/Cart"
import Contact from "./Pages/Contact"
import SingleProduct from "./Pages/SingleProduct"
import DataProvider from "./Context/DataProvider"
import SingleCatProduct from "./Pages/SingleCatProduct"
import AddProduct from "./admin/AddProduct"
import Register from "./Pages/Register"
import Login from "./Pages/Login"


const router = createBrowserRouter([
  {
    path: '/',
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/user/login",
        element: <Login />
      },
      {
        path: "/user/register",
        element: <Register />
      },
      {
        path: "/product/:id",
        element: <SingleProduct />
      },
      {
        path: "/category/:id",
        element: <SingleCatProduct />
      },
      {
        path: "/admin/Addproduct",
        element: <AddProduct />
      },
    ]
  }
])

function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  )
}

export default App