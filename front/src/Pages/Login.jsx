import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';
import { useAuth } from '../Context/AuthProvider.jsx';

function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    console.log("login data" + data)

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
            });
            checkAuth();
            if (
                response.status === 200 && response.data.message === "Login Successful"
            ) {
                const searchParams = new URLSearchParams(window.location.search);
                const URLParam = searchParams.get("referer");
                if (URLParam) {
                    window.location.href = URLParam
                } else {
                    navigate("/")
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit} className='flex gap-10' >
                <input type="email"
                    name='email'
                    value={data.email}
                    placeholder='Enter Email'
                    onChange={handleChange} className='border-2 px-3 w-[250px] rounded py-1' />
                <input type="password"
                    name='password'
                    value={data.password}
                    placeholder='Choose a Strong Password'
                    onChange={handleChange} className='border-2 px-3 w-[250px] rounded py-1' />
                <button type="submit" className='border-2 rounded px-3 bg-cyan-600 text-white cursor-pointer font-bold'>Login</button>
            </form>

            <p className='mt-3'>
                New User? <NavLink to='/user/register'><span className='underline hover:text-blue-600 '>Register</span></NavLink>
            </p>
        </div>
    )
}

export default Login