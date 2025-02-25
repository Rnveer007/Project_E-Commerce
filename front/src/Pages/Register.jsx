import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import instance from '../axiosConfig';

function Register() {
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [data, setData] = useState({
        name: "",
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
        try {
            e.preventDefault();
            const response = await instance.post("./user/register", data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    function handleConfirmPassword(e) {
        if (e.target.value !== data.password)
            setPasswordMatch(false)
        else {
            setPasswordMatch(true)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name='name'
                    value={data.name}
                    placeholder='Enter Name'
                    onChange={handleChange} />
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
                <input type="password"
                    name='cpassword'
                    placeholder='Confirm Password '
                    onChange={handleConfirmPassword} />
                {!passwordMatch ? <span> Password do not match </span > : ""}
                <button type='submit'>Register</button>
            </form>

            <p>
                Already Regstration? <NavLink to="/user/login">Login</NavLink>
            </p>
        </>
    )
}

export default Register