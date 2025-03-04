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
                <button type="submit" className='border-2 rounded px-3 bg-cyan-600 text-white  cursor-pointer font-bold'>Login</button>
            </form>

            <p className='mt-3'>
                New User? <NavLink to='/user/register'><span className='underline hover:text-blue-600 '>Register</span></NavLink>
            </p>
        </div>
    )
}

export default Login