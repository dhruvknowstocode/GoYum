import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { baseUrl } from '../Url';
import './Cart.css'

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const [loading, setLoading] = useState(false); // State to manage spinner visibility

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3' style={{ color: 'gray' }}>
                    The Cart is Empty!
                </div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        setLoading(true); // Show spinner
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch(`${baseUrl}/api/orderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("JSON RESPONSE:::::", response.status);
        if (response.status === 200) {
            dispatch({ type: "DROP" });
        }
        setLoading(false); // Hide spinner
    };

    const handleRemove = (index) => {
        dispatch({ type: "REMOVE", index: index });
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead style={{ color: 'green', fontSize: '1.5rem' }}>
                        <tr>
                            <th scope='col' style={{ color: 'white', fontSize: '1.5rem' }}>#</th>
                            <th scope='col' style={{ color: 'white', fontSize: '1.5rem' }}>Name</th>
                            <th scope='col' style={{ color: 'white', fontSize: '1.5rem' }}>Quantity</th>
                            <th scope='col' style={{ color: 'white', fontSize: '1.5rem' }}>Option</th>
                            <th scope='col' style={{ color: 'white', fontSize: '1.5rem' }}>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={food.id}>
                                <th scope='row' style={{ color: 'white' }}>{index + 1}</th>
                                <td style={{ color: 'white' }}>{food.name}</td>
                                <td style={{ color: 'white' }}>{food.qty}</td>
                                <td style={{ color: 'white' }}>{food.size}</td>
                                <td style={{ color: 'white' }}>₹{food.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => handleRemove(index)}
                                        style={{ fontSize: '18px', color: 'white', backgroundColor: 'red' }}
                                    >
                                        -
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1 style={{ color: 'green', fontSize: '2rem' }}>Total Price: ₹{totalPrice}/-</h1>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        className='btn'
                        style={{ backgroundColor: 'green', color: 'white' }}
                        onClick={handleCheckOut}
                    >
                        Check Out
                    </button>
                </div>
            </div>

            {/* Spinner Overlay */}
            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
}
