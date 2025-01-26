import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './History.css';
import axios from 'axios';

// Sample Data
const sampleLostItems = [
  {
    id: 1,
    title: "Lost Wallet",
    description: "A black leather wallet with several credit cards and an ID.",
    dateLost: "2025-01-15"
  },
  {
    id: 2,
    title: "Lost Keys",
    description: "A set of keys with a red keychain.",
    dateLost: "2025-01-18"
  },
  {
    id: 3,
    title: "Lost Phone",
    description: "A blue iPhone 12 with a cracked screen.",
    dateLost: "2025-01-20"
  }
];

const sampleFoundItems = [
  {
    id: 1,
    title: "Found Backpack",
    description: "A blue backpack with textbooks inside.",
    dateFound: "2025-01-16"
  },
  {
    id: 2,
    title: "Found Watch",
    description: "A silver wristwatch with a leather strap.",
    dateFound: "2025-01-19"
  },
  {
    id: 3,
    title: "Found Sunglasses",
    description: "A pair of Ray-Ban sunglasses in a black case.",
    dateFound: "2025-01-22"
  }
];

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
    console.log("Item clicked:", item);
    axios.post('http://127.0.0.1:5000/rank_posts', { "id": item.id })
    .then(response => {
      const itemData = response.data;
      console.log(itemData);
      navigate('/search-results', { state: { itemData } });
    })
    .catch(error => {
      console.error('Error sending data to backend:', error);
    });
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
