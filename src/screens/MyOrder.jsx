import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { baseUrl } from '../Url';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        await fetch(`${baseUrl}/api/myOrderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            setOrderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {Object.keys(orderData).length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div key={arrayData._id}>
                                                    {arrayData.Order_date ? (
                                                        <div className='m-auto mt-5'>
                                                            {arrayData.Order_date}
                                                            <hr />
                                                        </div>
                                                    ) : (
                                                        <div className='col-12 col-md-6 col-lg-3'>
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size} plate</span>
                                                                        <span className='m-1'>{arrayData.Order_date}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    );
                                }) : ""
                        );
                    }) : ""}
                </div>
            </div>

            <Footer />
        </div>
    );
}
