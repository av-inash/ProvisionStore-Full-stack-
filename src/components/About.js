import React from 'react';
import './styleAbout.css';
import Footer from './Footer';

const About = () => {
    return (
        <div className="a-container">
            <div className="main-a-container">
                <div className="img-head">
                    <div className="a-img">
                        <img
                            src="https://seersco.com/images/design-new/about-us-banner.svg"
                            className="a-img-inner"
                            alt=""
                        />
                    </div>
                    <header className="a-head">
                        <p className="a-head-text">About Us</p>
                        <p className="a-para">
                            -- I began my project by sketching a rough outline on pen and paper, detailing the execution flow of my code from top to bottom. Opting for a frontend-first approach, I initiated the creation of a React app. In the initial phase, I focused on building a responsive navbar component, complete with a list corresponding to each menu item such as Home, About, Contact, Login, and Signup. Each menu item led to a dedicated page, meticulously designed with CSS to ensure a visually appealing layout.

                            Moving on to the Home page, I structured product cards along with a search bar for users to find specific items. Implementing a search functionality, the results displayed on a separate screen showcased full product specifications. A convenient back button was added to navigate to the previous page seamlessly.

                            Having wrapped up the frontend development, I transitioned to the backend. The first step involved installing necessary dependencies and packages. Following a professional coding style and adhering to the Model-View-Controller (MVC) pattern, I wrote controllers for each aspect of the application. Implementing JWT for robust authorization and authentication, I meticulously followed the instructions outlined in the task assignment.

                            To run the React app, simply execute "npm start," and for the backend, the command "npm run dev" ensures the smooth functioning of the entire application.
                        </p>
                    </header>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
