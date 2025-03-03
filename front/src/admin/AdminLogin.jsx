import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';
import { useAuth } from '../Context/AuthProvider';


function AdminLogin() {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const { checkAuthAdmin } = useAuth();
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
            const response = await instance.post("/admin/login", data, {
                withCredentials: true
            })
            // console.log(response.data);
            checkAuthAdmin();
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
        </div>
    )
}

export default AdminLogin