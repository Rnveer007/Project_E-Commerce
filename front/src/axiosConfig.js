import axios from "axios";

const instance = axios.create({
    // baseURL: "https://ecommerce-api-8ga2.onrender.com/api",
    baseURL: "http://localhost:4000/api"
});

export default instance;



// **** Need to be study about blow points :-  ****
// Other arguments to create
// withCredentials
// timeout

// interceptor