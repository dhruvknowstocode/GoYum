import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleAddtoCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
        return;
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
        return;
      }
      return;
    }
    
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
  };

  let finalPrice = qty * parseInt(options[size]);
  
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      {showAlert && (
        <div className="alert alert-success" role="alert" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          Item added to cart!
        </div>
      )}
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="Paneer Tikka Kebabs"
          style={{ height: '170px', objectFit: 'fill' }}
        />
        <div className="card-body" style={{ maxHeight: '150px', overflowY: 'auto' }}>
          <h5 className="card-title" style={{ fontWeight: 'bold' }}>{props.foodItem.name}</h5>
          <p className="card-text description-text" style={{ fontSize: '0.75rem', fontFamily: 'Arial' }}>
            {props.foodItem.description}
          </p>
          <div className="container w-100">
            <select className='m-2 h-100 bg-success' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='d-inline h-100 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-2' onClick={handleAddtoCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
