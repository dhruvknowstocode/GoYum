import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import './Navbar.css';

export default function Navbar() {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const cartButton = (
    <button 
      className='btn cart-btn mx-2 position-relative'
      onClick={() => setCartView(true)}
    >
      My Cart
      {data.length > 0 && (
        <Badge pill bg='danger' className='position-absolute top-0 start-100 translate-middle'>
          {data.length}
        </Badge>
      )}
    </button>
  );

  const authButtons = (
    <div className='d-flex'>
      <Link className='btn login-btn mx-1' to='/login'>Login</Link>
      <Link className='btn signup-btn mx-1' to='/createuser'>Sign Up</Link>
    </div>
  );

  const userButtons = (
    <div className='d-flex align-items-center'>
      {cartButton}
      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
      <button 
        className='btn logout-btn mx-2'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-success'>
      <div className='container-fluid'>
        <Link className='navbar-brand fs-2 fst-italic' to='/'>
          GoYum
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active fs-5' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            {localStorage.getItem('authToken') && (
              <li className='nav-item'>
                <Link className='nav-link active fs-5' aria-current='page' to='/myOrder'>
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          {localStorage.getItem('authToken') ? userButtons : authButtons}
        </div>
      </div>
    </nav>
  );
}
