import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Url';
import Navbar from '../components/Navbar';
import './Login.css'; // Import the CSS file

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);  // Start loading
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
        } finally {
            setIsLoading(false);  // Stop loading
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <Navbar />
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} required />
                        <small>We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <div className="password-input-group">
                            <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} required />
                            <button type="button" className="toggle-password-btn" onClick={togglePasswordVisibility}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-success" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    {' '}Logging in...
                                </>
                            ) : "Submit"}
                        </button>
                        <Link to="/createuser" className="btn btn-danger">I am a new user</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
