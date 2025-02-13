import axios from "axios";

const intance = axios.create({
    baseURL : "https://ecommerce-api-8ga2.onrender.com/api",
});

export default intance;



// **** Need to be study about blow points :-  ****
// Other arguments to create
// withCredentials
// timeout

// interceptor