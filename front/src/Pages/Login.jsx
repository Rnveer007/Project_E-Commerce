import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';
import { useAuth } from '../Context/AuthProvider';


function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const { checkAuth } = useAuth();
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await instance.post("/user/login", data, {
                withCredentials: true
            })
            console.log(response.data);
            checkAuth();
            if (
                response.status === 200 && response.data.message === "Login Successful"
            )
                navigate("/")

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="email"
                    name='email'
                    value={data.email}
                    placeholder='Enter Email'
                    onChange={handleChange} />
                <input type="password"
                    name='password'
                    value={data.password}
                    placeholder='Choose a Strong Password'
                    onChange={handleChange} />
                <button type="submit">Login</button>
            </form>

            <p>
                new User? <NavLink to='/user/register'>Register</NavLink>
            </p>
        </div>
    )
}

export default Login