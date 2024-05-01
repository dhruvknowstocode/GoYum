import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Url';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/api/loginuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                if (data.success) {
                    alert("User login successful");
                    localStorage.setItem("userEmail", credentials.email);
                    localStorage.setItem("authToken", data.authToken);
                    console.log(localStorage.getItem("authToken"));
                    navigate("/");
                } else {
                    alert("Invalid credentials. Please try again.");
                }
            } else {
                alert("Failed to log in. Please try again later.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const inputStyle = {
        marginBottom: '1rem',
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div style={{ ...inputStyle, marginBottom: '1rem' }}>
                    <label htmlFor="exampleInputEmail1" style={{ fontWeight: 'bold' }}>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} style={inputStyle} />
                    <div style={{ fontSize: '0.875rem', color: '#6c757d' }}>We'll never share your email with anyone else.</div>
                </div>
                <div style={{ ...inputStyle, marginBottom: '1rem' }}>
                    <label htmlFor="exampleInputPassword1" style={{ fontWeight: 'bold' }}>Password</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} style={inputStyle} />
                        <button style={{ ...buttonStyle, marginLeft: '0.5rem', backgroundColor: '#6c757d', color: 'white' }} type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>
                    </div>
                </div>
                <button type="submit" className="m-3 btn btn-success" style={buttonStyle}>Submit</button>
                <Link to="/createuser" className='m-3 btn btn-danger' style={buttonStyle}>I am a new user</Link>
            </form>
        </div>
    );
}
