// CardDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styleCarddetail.css';
import Footer from './Footer';

const CardDetail = () => {
    const [item, setItem] = useState(null);
    const { index } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.kalpav.com/api/v1/product/category/retail');
                const data = await response.json();

                // Assuming 'data.response' contains the card details
                const cardDetails = data.response[Number(index)];

                if (cardDetails) {
                    setItem(cardDetails);
                } else {
                    console.error('Card not found');
                }
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };

        fetchData();
    }, [index]);

    if (!item) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or message
    }

    return (
        <div>

            <div className="carddetail-container">
                <div className="carddetail-main-container">
                    <Link to="/">&lt;--back</Link>
                    <div className="carddetail-c-container">
                        <div className="card-d-card">
                            <Link to="#" className="carddetail_image_container">
                                <img
                                    src={`https://source.unsplash.com/random/600×400?${item.productCategory.productCategoryName}`}
                                    alt={`card image`}
                                    className="carddetail_image"
                                    loading="lazy"
                                />
                            </Link>
                            <div className="carddetail_title_container">
                                <h2 className="carddetail_title">{item.productCategory.productCategoryName}</h2>
                            </div>

                            <div className="carddetail_wholesale">
                                <p>Wholesale Availability: {item.productCategory.wholeSale ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="carddetail_retail">
                                Retail Availability: {item.productCategory.retail ? 'Yes' : 'No'}
                            </div>
                        </div>



                    </div>

                    <div className="carddetail-text">
                        <header className="carddetail-text-head" >{item.productCategory.productCategoryName}</header>
                        <p className="carddetail-text-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi a, accusantium molestiae, voluptatibus quibusdam cum officia dolorem eius quasi architecto sint atque beatae vitae fugit cumque suscipit. Tempora harum corporis odio doloremque illo voluptatibus, error impedit, qui deleniti excepturi numquam sint. Iste blanditiis quam officiis consequuntur facere cumque consectetur perspiciatis minus earum sint similique vel, dolor voluptate quia libero asperiores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et labore provident eos distinctio repellendus corporis maiores minima minus dicta iusto. Et doloribus in ipsa commodi ab nostrum sapiente ipsam sunt quis esse voluptates ad ratione ut praesentium maxime atque, animi illum numquam asperiores recusandae veniam necessitatibus nulla. Cum, aperiam ab?</p>
                    </div>


                </div>

            </div>
            <Footer />

        </div>

    );
};

export default CardDetail;







