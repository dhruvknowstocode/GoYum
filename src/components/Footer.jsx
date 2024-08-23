import React from 'react';

export default function Footer() {
  return (
    <footer 
      className="d-flex flex-wrap justify-content-between align-items-center border-top"
      style={{
        backgroundColor: '#2e2e2e', /* Dark greenish-black background */
        color: 'white', /* White text color */
        padding: '1.5rem 2rem', /* Padding for top/bottom and left/right */
      }}
    >
      <div className="col-md-4 d-flex align-items-center">
        <span className="text-muted">© 2024 <i>GoYum</i>, Inc</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3"><a className="text-muted" href="/">Home</a></li>
        <li className="ms-3"><a className="text-muted" href="/about">About Us</a></li>
        <li className="ms-3"><a className="text-muted" href="/contact">Contact</a></li>
      </ul>
    </footer>
  );
}
