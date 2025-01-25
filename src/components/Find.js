import React, { useState } from 'react';
import './Find.css';

function Find() {
  const [formData, setFormData] = useState({
    description: '',
    picture: null,
    location: '',
    dateAndTime: '',
    name: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-api.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data submitted successfully');
        setFormData({ description: '', picture: null, location: '', dateAndTime: '', name: '', phoneNumber: '' }); // Reset form
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form');
    }
  };

  return (
    <div class = "find">
      <h1>Find Your Item</h1>
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
            value={formData.picture}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Where did you find it?
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
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
        <button type="submit">Submit</button>
      </form>
      </div>
  );
}

export default Find;