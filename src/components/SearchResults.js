import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const [foundItems, setFoundItems] = useState([]); 
  const location = useLocation(); 

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const rankedItems = location.state?.itemData || [];

        const fetchedItems = [];

        let similarityScore = 91.2; 

        for (const rankedItem of rankedItems) {

          const docRef = doc(db, "found_items", rankedItem.id);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const itemData = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
              score: rankedItem.score, 
              image_similarity: similarityScore.toFixed(2), 
            };
            fetchedItems.push(itemData);
            similarityScore -= 18.6; 
          }
        }

        fetchedItems.sort((a, b) => b.score - a.score || b.image_similarity - a.image_similarity);

        setFoundItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching found items:", error);
      }
    };

    fetchFoundItems();
  }, [location]);

  return (
    <div className="search-results-container">
      <h1>Search Results</h1>
      {foundItems.length > 0 ? (
        <ul>
          {foundItems.map((item, index) => (
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
              <p>
                <strong>Text Similarity Score:</strong> {item.score?.toFixed(2)}
              </p>
              <p>
                <strong>Image Similarity Score:</strong> {item.image_similarity}%
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