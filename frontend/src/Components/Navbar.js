import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation()
    const logOut = () =>{
        localStorage.removeItem('token')
        props.toggleAlert("Logged Out Successfully!", "success")
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`${location.pathname}` === "/" ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`${location.pathname}` === "/about" ? "nav-link active" : "nav-link"} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link type="button" to='/login' className="btn btn-primary mx-1">LogIn</Link>
                        <Link type="button" to='/signup' className="btn btn-primary mx-1">SignUp</Link>
                    </form>:<Link type="button" onClick={logOut} to='/login' className="btn btn-primary mx-1">Log Out</Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
