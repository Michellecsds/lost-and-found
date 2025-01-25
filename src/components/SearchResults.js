import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  
  // Log the query string to verify it's being captured
  console.log('Location:', location);
  
  const params = new URLSearchParams(location.search);
  
  const itemType = params.get('itemType');
  const title = params.get('title');
  const description = params.get('description');
  const date = params.get('date');

  return (
    <div className="search-results-container">
      <h1>Search Results</h1>
      {title ? (
        <div className="item-details">
          <h2>{itemType} Item: {title}</h2>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Date {itemType}:</strong> {date}</p>
        </div>
      ) : (
        <p>No item details available.</p>
      )}
      
      {/* Back Link */}
      <Link to="/History" className="back-link">Back to History</Link>
    </div>
  );
};

export default SearchResults;