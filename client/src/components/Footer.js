// Footer.js
import React from 'react';
// import './styleFooter.css'
import './footerstle.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            {/* 
            <foot classNameName="footbar footbar-expand-lg footbar-dark bg-dark ">
                <div classNameName="container-fluid">
                    <Link classNameName="footbar-brand" to="#">
                        <img src="http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png" alt="footbar Logo" />
                    </Link>
                    <button classNameName="footbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#footbarSupportedContent" aria-controls="footbarSupportedContent" aria-expanded="false" aria-label="Toggle footigation">
                        <span classNameName="footbar-toggler-icon"></span>
                    </button>
                    <div classNameName="collapse footbar-collapse" id="footbarSupportedContent">
                        <ul classNameName="footbar-foot ms-auto mb-2 mb-lg-0">
                            <li classNameName="foot-item">
                                <Link classNameName="foot-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li classNameName="foot-item">
                                <Link classNameName="foot-link active" aria-current="page" to="/about">About</Link>
                            </li>
                            <li classNameName="foot-item">
                                <Link classNameName="foot-link active" aria-current="page" to="/contact">Contact</Link>
                            </li>
                            <li classNameName="foot-item">
                                <Link classNameName="foot-link active" aria-current="page" to="/login">Login</Link>
                            </li>
                            <li classNameName="foot-item">
                                <Link classNameName="foot-link active" aria-current="page" to="/signup">Register</Link>
                            </li>


                        </ul>

                    </div>
                </div>
            </foot> */}


            <div className="footer">
                <div className='footer-image'>
                    <div><Link to="www.facebook.com" className="foot-link"><img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/46-facebook-512.png" className="footer-img-cls" alt="Facebook" /></Link></div>
                    <div><Link to="www.instagram.com" className="foot-link"><img src="https://cdn3.iconfinder.com/data/icons/picons-social/57/38-instagram-1024.png" className="footer-img-cls2" alt="Instagram" /></Link></div>
                    <div><Link to="www.twitter.com" className="foot-link"><img src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Twitter_svg-128.png" className="footer-img-cls" alt="Twitter" /></Link></div>
                </div>
                <ul className="footer-foot">
                    <li className="foot-item">
                        <Link className="foot-link" href="#">Term of Use</Link>
                    </li>
                    <li className="foot-item">
                        <Link className="foot-link" href="#">Privacy Policy</Link>
                    </li>
                </ul>
                <div className="copyright">
                    &copy; 2024 Provision Store
                </div>
            </div>


        </>
    );
};

export default Footer;
