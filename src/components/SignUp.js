import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styleSignup.css';
import Footer from './Footer';


// const SignUp = () => {

//     const navigate = useNavigate();

//     const [user, setUser] = useState({
//         fullName: "", email: "", password: "", mobile: "", address: ""
//     })

//     let name, value;
// const handleInputs = (e) => {
//     console.log(e)
//     name = e.target.name;
//     value = e.target.value;

//     setUser((prevUser) => ({
//         ...prevUser,
//         [name]: value,
//     }))


// }
// const handleInputs = (e) => {
//     const { name, value } = e.target;

//     setUser((prevUser) => ({
//         ...prevUser,
//         [name]: value,
//     }));
// };
// const PostData = async (e) => {
//     e.preventDefault();

//     const { fullName, email, password, mobile, address } = user;
//     const res = await fetch("/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             fullName, email, password, mobile, address

//         })
//     })
//     const data = await res.json();
//     if (!data) {
//         window.alert("invalid Registration");
//         console.log("invalis Registration")
//     } else {
//         window.alert("Registration Successfull")
//         console.log("registration successfull")

//         navigate('/login');
//     }

// }

const SignUp = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const PostData = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/v1/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullName, email, password, mobile, address
            })
        });

        const data = await res.json();
        if (!data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successful");
            console.log("Registration successful");
            navigate('/login');
        }
    };


    return (
        <div className="parent-container">
            <div className="container">
                <div className="img-container">
                    <div className="img-inner-container">
                        <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
                            alt="image"
                            className="img-class"
                        />
                    </div>
                    <div className="para-1">
                        <span className="span1">Already have an account?</span>
                        <Link to="/login">
                            <span className="span2">Login</span>
                        </Link>
                    </div>
                </div>
                <div className="signup-container">
                    <h1 className="signup-head">Sign Up</h1>
                    <form method="POST">
                        <div className="signup-name">
                            <input
                                type="text"
                                name="fullName"
                                autoComplete='off'

                                value={fullName}
                                onChange={handleFullNameChange}
                                className="name-class"
                                placeholder="Enter your FullName"
                            />
                        </div>
                        <div className="signup-email">
                            <input
                                type="email"
                                className="email-class2"
                                name="email"
                                autoComplete='off'
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="signup-password">
                            <input
                                type="password"
                                autoComplete='off'
                                value={password}
                                onChange={handlePasswordChange}
                                className="password-class"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="signup-mobile">
                            <input
                                type="number"
                                name="mobile"
                                autoComplete='off'
                                value={mobile}
                                onChange={handleMobileChange}
                                className="mobile-class"
                                placeholder="Enter your Mobile Number"
                            />
                        </div>
                        <div className="signup-address">
                            <input
                                type="text"
                                className="address-class"
                                name="address"
                                autoComplete='off'
                                value={address}
                                onChange={handleAddressChange}
                                placeholder="Enter your complete address"
                            />
                        </div>
                        <div className="signup-button">
                            <input type="submit" name="signup" className="button-class" value="Sign Up" onClick={PostData} />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;
