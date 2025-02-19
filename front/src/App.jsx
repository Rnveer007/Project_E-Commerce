import { createBrowserRouter, RouterProvider } from "react-router-dom"
import First from "./First"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Cart from "./Pages/Cart"
import Contact from "./Pages/Contact"
import SingleProduct from "./Pages/SingleProduct"
import DataProvider from "./Context/DataProvider"
import SingleCatProduct from "./Pages/SinglecatProduct"
import AddProduct from "./admin/AddProduct"

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