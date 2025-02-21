import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Login() {
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

    function handleSubmit(e) {
        e.preventDefault()
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