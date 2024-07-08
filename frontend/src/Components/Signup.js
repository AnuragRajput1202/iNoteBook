import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        userSignUp(credentials.username, credentials.email, credentials.password)
    }
    const userSignUp = async (name, email, password) => {
        //API Call
        const url = "https://inotebook-ec77.onrender.com/api/auth/createuser"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        })
        // eslint-disable-next-line
        const json = await response.json()
        if(json.success){
            //redirecting to Home page
            localStorage.setItem('token', json.token)
            navigate('/')
            props.toggleAlert("Registered Successfully", "success")
        } else {
            props.toggleAlert("Invalid details!", "danger")
    }
}
    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">User Name</label>
                    <input type="username" onChange={handleChange} name='username' value={credentials.username} className="form-control my-2" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter User name" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={handleChange} name='email' value={credentials.email} className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} name='password' value={credentials.password} className="form-control my-2" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary my-2">Register</button>
            </form>
        </>
    )
}

export default Signup
