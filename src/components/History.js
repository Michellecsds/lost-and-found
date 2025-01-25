import React, { useState, useEffect } from 'react';
import './History.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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
  //const [lostItems, setLostItems] = useState(sampleLostItems);
  //const [foundItems, setFoundItems] = useState(sampleFoundItems);

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch lost items
    const fetchLostItems = async () => {
      const snapshot = await getDocs(collection(db, 'lost_items'));
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLostItems(items);
    };

    // Fetch found items
    const fetchFoundItems = async () => {
      const snapshot = await getDocs(collection(db, 'found_items'));
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFoundItems(items);
    };

    fetchLostItems();
    fetchFoundItems();
  }, []);

  const handleItemClick = (itemType, item) => {
    console.log("Item clicked:", item);
    axios.post('http://127.0.0.1:5000/rank_posts', { id: item.id },{
      headers: {
     'Content-Type': 'application/json',  // Ensure proper content type
   }
    })
      .then(response => {
        const itemData = response.data;
        // Navigate to search results page with item data from backend response
        navigate('/search-results', { state: { itemData } });
      })
      .catch(error => {
        console.error('Error sending data to backend:', error);
      });
  };

  return (
    <div className="history-container">
      <h1>User's Post History</h1>

      <div className="section">
        <h2>Lost Items</h2>
        {lostItems.length > 0 ? (
          <ul>
            {lostItems.map(item => (
              <li key={item.id} 
              onClick={() => handleItemClick("Lost", item)} 
              style={{ cursor: 'pointer' }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><strong>Date Lost:</strong> {item.date_lost}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No lost items found.</p>
        )}
      </div>

      <div className="section">
        <h2>Found Items</h2>
        {foundItems.length > 0 ? (
          <ul>
            {foundItems.map(item => (
              <li key={item.id}
              onClick={() => handleItemClick("Found", item)}
              style={{ cursor: 'pointer' }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><strong>Date Found:</strong> {item.date_found}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No found items reported.</p>
        )}
      </div>
    </div>
  );
}

export default History;

