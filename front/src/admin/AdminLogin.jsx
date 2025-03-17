import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';
import { useAuth } from '../Context/AuthProvider';


function AdminLogin() {
    const { checkAuthAdmin } = useAuth();
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await instance.post("/admin/login", data, {
                withCredentials: true
            })
            // console.log(response.data);
            checkAuthAdmin();
            if (
                response.status === 200
            ) { navigate("/admin/Addproduct") }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='p-5'>
            <form action="" onSubmit={handleSubmit} className='flex gap-10'>
                <input type="email"
                    name='email'
                    value={data.email}
                    placeholder='Enter Email'
                    onChange={handleChange} className='border-2 w-[250px] px-3 py-1' />
                <input type="password"
                    name='password'
                    value={data.password}
                    placeholder='Choose a Strong Password'
                    onChange={handleChange} className='border-2 w-[250px] px-3 py-1' />
                <button type="submit" className='border-2 rounded px-3 bg-cyan-600 text-white  cursor-pointer font-bold'>Login</button>
            </form>
        </div>
    )
}

export default AdminLogin