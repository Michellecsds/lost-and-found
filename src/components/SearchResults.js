import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const [foundItems, setFoundItems] = useState([]); // To store found items
  const location = useLocation(); // Retrieve any passed state if needed

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const rankedItems = location.state.itemData;

        // Initialize an empty array to store the full Firebase objects
        const fetchedItems = [];

        for (const rankedItem of rankedItems) {
        // Get the corresponding document from Firebase using the item id
        const docRef = doc(db, "found_items", rankedItem.id);
        const docSnapshot = await getDoc(docRef);
        
        if (docSnapshot.exists()) {
            // Merge Firebase data with the ranked item data
            const itemData = {
            id: docSnapshot.id,
            ...docSnapshot.data(),
            score: rankedItem.score, // Keep the score from the ranking
            };
            fetchedItems.push(itemData);
        }
        }
        setFoundItems(fetchedItems);
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
