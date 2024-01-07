// LoginComponent.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styleLogin.css'; // Import the CSS file
import Footer from './Footer';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const LoginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/v1/users/login", {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, password: password
            })
        })

        const data = await res.json();
        if (!data) {
            window.alert("Invalid Credential")
        } else {
            window.alert("Login Successfully")
            navigate('/');
        }
    }



    return (
        <div className="parent-container">
            <div className="container">
                <div className="img-container">
                    <div className="img-inner-container">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/005/879/539/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
                            alt="image"
                            className="img-class"
                        />
                    </div>
                    <div className="para-1">
                        <span className="span1">Not have an account?</span>
                        <Link to="/signup">
                            <span className="span2">Sign Up Here</span>
                        </Link>
                    </div>
                </div>
                <div className="login-container">
                    <h1 className="login-head">Login</h1>
                    <form method="POST">
                        <div className="login-email">
                            <input
                                type="email"
                                className="email-class"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="login-password">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="password-class"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="login-button">
                            <input type="submit" name="login" className="button-class" value="Log In" onClick={LoginUser} />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;