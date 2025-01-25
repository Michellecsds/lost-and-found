import React, { useState } from 'react';

const SubmitFoundItemPage = () => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    date_found: '',
    photo_url: '',
    contact_details: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/found-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Found item submitted successfully.');
        setFormData({
          description: '',
          location: '',
          date_found: '',
          photo_url: '',
          contact_details: '',
        });
      } else {
        alert('Error submitting found item.');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div>
      <h1>Submit Found Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Item Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Found Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_found"
          value={formData.date_found}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="photo_url"
          placeholder="Photo URL (optional)"
          value={formData.photo_url}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact_details"
          placeholder="Your Contact Details"
          value={formData.contact_details}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitFoundItemPage;
