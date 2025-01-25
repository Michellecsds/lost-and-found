import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./History.css";

const History = () => {
  const [lostItems, setLostItems] = useState([]); // To store lost items
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        // Fetch all documents from the "lost_items" collection
        const querySnapshot = await getDocs(collection(db, "lost_items"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched lost items:", items); // Debugging log
        setLostItems(items);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchLostItems();
  }, []);

  // Navigate to SearchResults page
  const handleItemClick = (item) => {
    navigate("/search-results", { state: { lostItem: item } });
  };

  return (
    <div className="history-container">
      <h1>My Items</h1>
      <div className="section">
        <h2>Lost Items</h2>
        {lostItems.length > 0 ? (
          <ul>
            {lostItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{ cursor: "pointer" }}
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>Date Lost:</strong> {item.date_lost}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No lost items found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
