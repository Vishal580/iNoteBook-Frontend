import React, {useEffect} from 'react'
import {Link, useNavigate, useLocation} from "react-router-dom";

function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
  return (
    <>  
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {(localStorage.getItem('token'))?(<li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                        </li>):""}
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {(!localStorage.getItem('token'))?(<form className="d-flex" role="search">
                        <Link className="btn btn-dark mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-dark" to="/signup" role="button">SignUp</Link>
                    </form>): (<button className="btn btn-dark" onClick={logout}>Logout</button>)}
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar
