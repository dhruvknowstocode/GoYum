import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css'; // Import your CSS file for styling

export default function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Feel free to reach out to us via email or phone...</p>
      <div className="contact-details">
        <p>Email: contact@gofood.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
}
