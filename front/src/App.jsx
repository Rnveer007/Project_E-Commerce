import { createBrowserRouter, RouterProvider } from "react-router-dom"
import First from "./First.jsx"
import Home from "./Pages/Home.jsx"
import About from "./Pages/About.jsx"
import Contact from "./Pages/Contact.jsx"
import SingleProduct from "./Pages/SingleProduct.jsx"
import DataProvider from "./Context/DataProvider.jsx"
import SingleCatProduct from "./Pages/SingleCatProduct.jsx"
import AddProduct from "./admin/AddProduct.jsx"
import Register from "./Pages/Register.jsx"
import Login from "./Pages/Login.jsx"
import AuthProvider from "./Context/AuthProvider.jsx"
import AddCategory from "./admin/AddCategory.jsx"
import DisplayHotDealsProducts from "./Components/DisplayHotDealsProducts.jsx"
import AdminLogin from "./admin/AdminLogin.jsx"
import ProtectedRoute from "./Components/ProtectedRoute.jsx"
import AdminHome from "./admin/AdminHome.jsx"
import AdminProducts from "./admin/AdminProducts.jsx"

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
        element: (
          <ProtectedRoute>
            <cart fallback="user/login" />
          </ProtectedRoute >
        )
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
        path: "/admin",
        element: <AdminLogin />
      },
      {
        path: "/admin/login",
        element: <AdminLogin />
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
        path: "/admin/home",
        element:
          <ProtectedRoute>
            <AdminHome fallback="admin/login" />
          </ProtectedRoute >
      },
      {
        path: "/admin/Addproduct",
        element:
          <ProtectedRoute>
            <AddProduct fallback="admin/login" />
          </ProtectedRoute >
      },
      {
        path: "/admin/products",
        element:
          <ProtectedRoute>
            <AdminProducts fallback="admin/login" />
          </ProtectedRoute >
      },
      {
        path: "/admin/AddCategory",
        element: (
          <ProtectedRoute>
            <AddCategory fallback="admin/login" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/hotdeals",
        element: <DisplayHotDealsProducts />
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