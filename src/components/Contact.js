import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleContact.css';
import Footer from './Footer';

const Contact = () => {


    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };


    const UserQuery = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/v1/users/query", {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, lastName, email, mobile, message, address
            })
        })

        const data = await res.json();
        if (!data) {
            window.alert("something error")
        } else {
            window.alert("Thanks for your message.we will get back you soon")
            navigate('/');
        }
    }




    return (
        <div className="c-container">
            <div className="c-main-container">
                <div className="c-head">Get In Touch</div>

                <form action="POST" id="contact_form">
                    <div className="c-name">
                        <div className="c-firstname">
                            <input type="text"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                name="firstName" className="c-input" placeholder="first name" />
                        </div>
                        <div className="c-lastname">
                            <input type="text"
                                value={lastName}
                                onChange={handleLastNameChange}
                                name="lastName" className="c-input" placeholder="last name" />
                        </div>
                    </div>
                    <div className="c-email-mobile">
                        <div className="c-email">
                            <input type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="c-input" placeholder="email" />
                        </div>
                        <div className="c-mobile">
                            <input type="number"
                                value={mobile}
                                onChange={handleMobileChange}
                                className="c-input" placeholder="mobile" />
                        </div>
                    </div>
                    <div className="c-address">
                        <input type="text"
                            value={address}
                            onChange={handleAddressChange}
                            className="c-input" placeholder="Address" />
                    </div>
                    <div className="c-textarea">
                        <textarea
                            id="message"
                            value={message}
                            onChange={handleMessageChange}

                            name="message"
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>
                    <div className="c-submit">
                        <button type="submit" onClick={UserQuery} className="c-button">Submit</button>
                    </div>
                </form>
                <p className="c-para">Thanks for Sharing</p>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
