import { createContext, useEffect, useState, useContext } from "react";
import instance from "../../axiosConfig";

const AdminAuth = createContext(null);

function AdminAuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loggedInAdmin, setLoggedInAdmin] = useState({});

  useEffect(() => {
    checkAuthAdmin();
  }, []);

  // Function to check if admin is logged in
  async function checkAuthAdmin() {
    try {
      const response = await instance.get("/admin/check", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAdminLoggedIn(true);
        setLoggedInAdmin(response.data.admin); 
      }
    } catch (error) {
      console.log(error);
      setIsAdminLoggedIn(false);
      setLoggedInAdmin({});
    }
  }

  // Function to log out the admin
  async function logout() {
    try {
      await instance.post(
        "/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAdminLoggedIn(false);
      setLoggedInAdmin({});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AdminAuth.Provider
      value={{
        isAdminLoggedIn,
        loggedInAdmin,
        logout,
        checkAuthAdmin,
      }}
    >
      {children}
    </AdminAuth.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuth);
}

export default AdminAuthProvider;
