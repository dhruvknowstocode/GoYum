import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { baseUrl } from '../Url';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setError('Failed to load data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return foodItems.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [foodItems, search]);

  return (
    <div>
      <Navbar />

      {/* Display Carousel and Footer regardless of loading state */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ zIndex: "9", bottom: "20px" }}>
            <div className="d-flex justify-content-center w-75">
              <input
                className="form-control me-2 bg-light text-dark"
                type="search"
                placeholder="Search for food..."
                aria-label="Search"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
              />
              <button
                className="btn btn-danger ms-2"
                onClick={() => { setSearch('') }}
                aria-label="Clear search"
              >
                X
              </button>
            </div>
          </div>
          {[
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&h=700&crop=entropy&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1554306297-0c86e837d24b?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ].map((src, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={src} className="d-block w-100 carousel-image" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container my-4">
        {/* Show loader or content */}
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-3 text-light">Please wait while we fetch the data...</div>
          </div>
        ) : error ? (
          <div className="text-center mt-5 text-danger">{error}</div>
        ) : (
          foodCat.length > 0 ? (
            foodCat.map((data) => (
              <div key={data._id} className='row mb-3'>
                <div className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {filteredItems.length > 0 ? (
                  filteredItems
                    .filter(item => item.CategoryName === data.CategoryName)
                    .map(filterItems => (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-3'>
                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                      </div>
                    ))
                ) : (
                  <div>No items found for this category</div>
                )}
              </div>
            ))
          ) : (
            <div>No categories found</div>
          )
        )}
      </div>
      
      <Footer />
      
      <style jsx>{`
        .carousel-image {
          height: 70vh; /* Adjust height as needed */
          object-fit: cover;
        }
        .carousel-caption {
          bottom: 30px;
        }
      `}</style>
    </div>
  );
}
