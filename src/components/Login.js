import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const[credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json); 

        //Redirect to Home Page
        if(json.success){
            //Save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        } else {  
            alert("Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} id="email" onChange={onChange} placeholder="Enter your Email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} id="passowrd" onChange={onChange} placeholder="Enter your Password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
