import React from 'react';
import './About.css';
import { Link } from 'react-router-dom'; // Import your CSS file for styling

export default function About() {
  return (
    <div className="about-container">
      <h2>About Our Food Ordering Service</h2>
      <p>Welcome to GoYum, your ultimate destination for ordering delicious meals from your favorite restaurants. Here at GoYum, we are passionate about connecting food lovers with top-quality dining experiences.</p>
      <p>Our mission is to make food ordering convenient, reliable, and enjoyable for everyone. Whether you're craving pizza, sushi, or something healthy, GoYum has you covered.</p>
      <h3>Our Guidelines:</h3>
      <ul>
        <li>Quality: We partner with trusted restaurants to ensure that every meal you order meets our high standards of quality and freshness.</li>
        <li>Convenience: With our user-friendly platform, you can easily browse menus, place orders, and track deliveries from the comfort of your home.</li>
        <li>Customer Satisfaction: Your satisfaction is our top priority. If you have any questions or concerns, our customer support team is here to assist you.</li>
        <li>Community: We believe in giving back to the community. That's why we support local businesses and strive to make a positive impact wherever we operate.</li>
      </ul>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
}
