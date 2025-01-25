import React, { useState } from 'react';
import './History.css';

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
  const [lostItems, setLostItems] = useState(sampleLostItems);
  const [foundItems, setFoundItems] = useState(sampleFoundItems);

  return (
    <div className="history-container">
      <h1>User's Post History</h1>

      <div className="section">
        <h2>Lost Items</h2>
        {lostItems.length > 0 ? (
          <ul>
            {lostItems.map(item => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><strong>Date Lost:</strong> {item.dateLost}</p>
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
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><strong>Date Found:</strong> {item.dateFound}</p>
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

