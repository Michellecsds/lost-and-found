import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {

  // Example data: Replace with dynamic data from your application
  const posts = [
    {
        "id": 1,
        "description": "Black bag with phone inside"
      },
      {
        "id": 2,
        "description": "Brown leather bag with wallet"
      },
      {
        "id": 3,
        "description": "Red backpack with water bottle holder"
      },
      {
        "id": 4,
        "description": "Gold watch with leather strap"
      },
      {
        "id": 5,
        "description": "Silver watch with metal band"
      }
  ];

  const location = useLocation();
  const { itemData } = location.state || {}; // Receive the item data passed from History.js

  if (!itemData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="search-results-container">
      <h1>Search Results</h1>
      <ul>
        {itemData.map((post, index) => (
          <li key={index}>
            <strong>Post ID:</strong> {post.id} <br />
            <strong>Description:</strong> {post.description}
          </li>
        ))}
      </ul>
      {/* Back Link */}
      <Link to="/" className="back-link">Back to History</Link>
    </div>
  );
};

export default SearchResults;