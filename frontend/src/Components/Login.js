import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        userLogin(credentials.email, credentials.password)
    }

    const userLogin = async (email, password) => {
        //API Call
        const url ="http://localhost:9010/api/auth/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()
        if(json.success){
            //redirecting to home page
            localStorage.setItem('token', json.token)
            navigate('/')
            props.toggleAlert("Logged in Successfully!", "success")
        } else {
            props.toggleAlert("Invalid credentials!", "danger")
        }
    }

    return (
        <div className='container my-3'>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={handleChange} name='email' value={credentials.email} className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} name='password' value={credentials.password} className="form-control my-2" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
