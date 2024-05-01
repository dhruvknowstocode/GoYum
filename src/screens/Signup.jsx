import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                if (data.success) {
                    alert("User created successfully");
                    navigate('/login');
                } else {
                    alert("Invalid credentials. Please check your input.");
                }
            } else {
                alert("Failed to create user. Please try again later.");
            }
        } catch (error) {
            console.error("Error creating user:", error);
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
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="name" style={{ fontWeight: 'bold' }}>Name</label>
                    <input type="text" style={inputStyle} name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="exampleInputEmail1" style={{ fontWeight: 'bold' }}>Email address</label>
                    <input type="email" style={inputStyle} id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} />
                    <div style={{ fontSize: '0.875rem', color: '#6c757d' }}>We'll never share your email with anyone else.</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="exampleInputPassword1" style={{ fontWeight: 'bold' }}>Password</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type={showPassword ? "text" : "password"} style={inputStyle} id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                        <button style={{ ...buttonStyle, marginLeft: '0.5rem', backgroundColor: '#6c757d', color: 'white' }} type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="exampleInputPassword1" style={{ fontWeight: 'bold' }}>Address</label>
                    <input type="text" style={inputStyle} name='geolocation' value={credentials.geolocation} onChange={onChange} />
                </div>
                <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745', color: 'white', marginRight: '1rem' }}>Submit</button>
                <Link to="/login" style={{ ...buttonStyle, backgroundColor: '#dc3545', color: 'white' }}>Already a user</Link>
            </form>
        </div>
    );
}
