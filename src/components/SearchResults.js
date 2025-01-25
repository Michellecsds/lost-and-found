import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const [foundItems, setFoundItems] = useState([]); // To store found items
  const location = useLocation(); // Retrieve any passed state if needed

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        // Fetch all documents from the "found_items" collection
        const querySnapshot = await getDocs(collection(db, "found_items"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched found items:", items); // Debugging log
        setFoundItems(items);
      } catch (error) {
        console.error("Error fetching found items:", error);
      }
    };

    fetchFoundItems();
  }, []);

  return (
    <div className="search-results-container">
      <h1>Search Results</h1>
      {foundItems.length > 0 ? (
        <ul>
          {foundItems.map((item) => (
            <li key={item.id} className="search-result-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>
                <strong>Date Found:</strong> {item.date_found}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Contact Details:</strong> {item.contact_details}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No found items to display.</p>
      )}
      
    </div>
  );
};

export default SearchResults;
