import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import './Report.css';

function Report() {
  const [formData, setFormData] = useState({
    description: '',
    picture: null,
    location: '',
    dateAndTime: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input for pictures
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data for Firebase
      const { description, location, dateAndTime, phoneNumber } = formData;
      const dataToSubmit = {
        description,
        location,
        dateAndTime,
        phoneNumber,
        timestamp: new Date(), // Add timestamp if needed
      };

      // Save data to Firestore
      await addDoc(collection(db, 'lost_items'), dataToSubmit);

      alert('Data submitted successfully!');
      setFormData({ description: '', picture: null, location: '', dateAndTime: '', phoneNumber: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('There was an error submitting the form');
    }
  };

  return (
    <div className="container-fluid report-form">
      <h1>Report a Lost Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Describe the item:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Upload a picture:
          <input
            type="file"
            name="picture"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Where did you lose it?
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          When did you lose it?
          <input
            type="datetime-local"
            name="dateAndTime"
            value={formData.dateAndTime}
            onChange={handleChange}
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
          />
        </label>
        <br />
        <button type="submit" class = "report-button">Submit</button>
      </form>
    </div>
  );
}

export default Report;
