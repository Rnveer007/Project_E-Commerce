import { createBrowserRouter, RouterProvider } from "react-router-dom"
import First from "./First.jsx"
import Home from "./Pages/Home.jsx"
import About from "./Pages/About.jsx"
import Cart from "./Pages/Cart.jsx"
import Contact from "./Pages/Contact.jsx"
import SingleProduct from "./Pages/SingleProduct.jsx"
import DataProvider from "./Context/DataProvider.jsx"
import SingleCatProduct from "./Pages/SingleCatProduct.jsx"
import AddProduct from "./admin/AddProduct.jsx"
import Register from "./Pages/Register.jsx"
import Login from "./Pages/Login.jsx"
import AuthProvider from "./Context/AuthProvider.jsx"


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
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  )
}

export default App