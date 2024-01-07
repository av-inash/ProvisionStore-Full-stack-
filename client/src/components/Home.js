


import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.kalpav.com/api/v1/product/category/retail');
                const data = await response.json();
                setData(data.response);
                setFilteredData(data.response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter(
            (item) => item.productCategory.productCategoryName.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    return (
        <div className="body_container">
            <div className="container1">
                <header className="header_conatiner">
                    <h1 className="header_title">Provision Store</h1>

                    <div className="header_desc">
                        <div className="search-item">
                            <input
                                type="text"
                                className="search-bar"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />

                        </div>
                        <div className="search-item-button">
                            <button type="button" className="search-button">
                                Search
                            </button>

                        </div>
                    </div>
                </header>

                <main className="main_container">
                    {filteredData.map((item, index) => (
                        <Link to={`/card-detail/${index}`} key={index} className="card_link">
                            <div className="card_container">
                                <a href="#" className="card_image_container">
                                    <img
                                        src={`https://source.unsplash.com/random/600×400?${item.productCategory.productCategoryName}`}
                                        alt={`card ${index + 1} image`}
                                        className="card_image"
                                        loading="lazy"
                                    />
                                </a>
                                <div className="card_title_container">
                                    <a href="#">
                                        <h2 className="card_title">{item.productCategory.productCategoryName}</h2>
                                    </a>
                                    {/* <p className="card_desc">{item.productCategory.productCategoryName}</p> */}
                                </div>
                                <div className="card_wholesale">
                                    <p>Wholesale Availability: {item.productCategory.wholeSale ? 'Yes' : 'No'}</p>
                                </div>
                                <div className="card_retail">
                                    Retail Availability: {item.productCategory.retail ? 'Yes' : 'No'}
                                </div>
                            </div>
                        </Link>
                    ))}
                </main>

            </div>
            <Footer />

        </div>

    );
};

export default Home;

