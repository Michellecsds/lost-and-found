import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const [matchedFoundItems, setMatchedFoundItems] = useState([]);
  const location = useLocation();
  const { lostItem } = location.state || {}; // Retrieve the selected lost item from state

  const foundItems = [
    {
      id: "0df6ae88-b102-4457-b368-338495ee21b0",
      name: "Red Backpack",
      description: "Red backpack found near the library entrance. Contains a notebook.",
      location: "UCL Central Library",
      date_found: "2025-01-25T20:26",
    },
    {
      id: "b6f8fd5b-02d2-410e-bb86-eb925b2662d5",
      name: "Yellow Watch",
      description: "1",
      location: "imperial gabor hall",
      date_found: "2025-01-18T10:59",
    },
    {
      id: "baa8ee7f-9a86-46bc-8244-196025aa9cde",
      name: "Red black Backpack",
      description: "Backpack with a laptop found near the park bench.",
      location: "Hyde Park London",
      date_found: "2025-01-22T00:32",
    },
    {
      id: "IDgGsSaGvcCTCJtbmo6N",
      name: "Black bag",
      description: "Black bag with phone inside",
      location: "covent garden",
      date_found: "2025-01-25T23:01",
    },
    {
      id: "rZpMo2cTxvsCpvxFd0g3",
      name: "Wallet",
      description: "Brown leather wallet",
      location: "king's cross station",
      date_found: "2024-01-25",
    },
  ];

  useEffect(() => {
    if (!lostItem) return;

    // Simulate matching logic with specific fake scores
    const matches = foundItems.map((foundItem) => {
      let imageSimilarity = 0;

      // Assign fake image similarity scores based on matching logic
      if (lostItem.name === "Red Backpack" && foundItem.name.includes("Backpack")) {
        imageSimilarity = foundItem.name === "Red Backpack" ? 95 : 85;
      } else if (lostItem.name === "Grey Backpack" && foundItem.name.includes("Backpack")) {
        imageSimilarity = foundItem.name === "Black bag" ? 90 : 80;
      } else if (lostItem.name === "Airpods") {
        imageSimilarity = 0; // Airpods do not match with any found item
      } else {
        imageSimilarity = Math.random() * 30; // Low similarity for unrelated items
      }

      return {
        ...foundItem,
        imageSimilarity: parseFloat(imageSimilarity.toFixed(2)), // Format to 2 decimals
      };
    });

    // Sort matches by image similarity
    matches.sort((a, b) => b.imageSimilarity - a.imageSimilarity);
    setMatchedFoundItems(matches);
  }, [lostItem]);

  if (!lostItem) {
    return <p>No lost item selected. Please return to the history page.</p>;
  }

  return (
    <div className="search-results-container">
      <h1>Search Results for: {lostItem.name}</h1>
      <p>{lostItem.description}</p>
      <p>
        <strong>Date Lost:</strong> {lostItem.date_lost}
      </p>
      <p>
        <strong>Location:</strong> {lostItem.location}
      </p>
      <h3>Potential Matches:</h3>
      {matchedFoundItems.length > 0 ? (
        <ul>
          {matchedFoundItems.map((foundItem) => (
            <li key={foundItem.id} className="search-result-item">
              <h4>{foundItem.name}</h4>
              <p>{foundItem.description}</p>
              <p>
                <strong>Date Found:</strong> {foundItem.date_found}
              </p>
              <p>
                <strong>Location:</strong> {foundItem.location}
              </p>
              <p>
                <strong>Image Similarity:</strong> {foundItem.imageSimilarity}%
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default SearchResults;
