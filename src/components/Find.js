import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import "./Find.css";

function Find() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Other",
    description: "",
    picture: null,
    location: "",
    dateAndTime: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0], // Capture the uploaded file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const itemId = uuidv4(); // Generate a unique ID for the found item

      // Add the form data to Firestore with the unique ID
      await setDoc(doc(db, "found_items", itemId), {
        id: itemId, // Explicitly store the ID
        name: formData.name,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        date_found: formData.dateAndTime,
        contact_details: formData.phoneNumber,
        photo_url: formData.picture ? URL.createObjectURL(formData.picture) : null, // Store URL if picture is uploaded
      });

      alert("Data submitted successfully with ID: " + itemId);

      // Reset form
      setFormData({
        name: "",
        category: "Other",
        description: "",
        picture: null,
        location: "",
        dateAndTime: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting the form");
    }
  };

  return (
    <div className="find">
      <h1>Report a Found Item/ Find Your Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name of the item:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Documents">Documents</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Describe the item:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Upload a picture:
          <input
            type="file"
            name="picture"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <label>
          Where did you find it?
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          When did you find it?
          <input
            type="datetime-local"
            name="dateAndTime"
            value={formData.dateAndTime}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Your phone number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Find;
