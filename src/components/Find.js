import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./Find.css";

function Find() {
  const [formData, setFormData] = useState({
    description: "",
    picture: null,
    location: "",
    dateAndTime: "",
    name: "",
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
      // Add the form data to the Firebase Firestore collection
      const docRef = await addDoc(collection(db, "found_items"), {
        description: formData.description,
        location: formData.location,
        date_found: formData.dateAndTime,
        contact_details: formData.phoneNumber,
        photo_url: formData.picture ? URL.createObjectURL(formData.picture) : null, // Store URL if picture is uploaded
      });

      alert("Data submitted successfully");
      console.log("Document written with ID: ", docRef.id);

      // Reset form
      setFormData({
        description: "",
        picture: null,
        location: "",
        dateAndTime: "",
        name: "",
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
