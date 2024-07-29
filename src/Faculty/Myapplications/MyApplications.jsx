// src/ProfileForm.js
import React, { useState, useEffect } from 'react';
import './MyApplications.css';

const MyApplications = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    UG: { yearOfPassing: '', percentage: '' },
    PG: { yearOfPassing: '', percentage: '' },
    PHD: { yearOfPassing: '', percentage: '' },
    experience: '',
    resume: ''
  });

  const [showUG, setShowUG] = useState(false);
  const [showPG, setShowPG] = useState(false);
  const [showPHD, setShowPHD] = useState(false);

  useEffect(() => {
    // Fetch user data from the backend
    fetch('/api/user')
      .then(response => response.json())
      .then(data => {
        setFormData(data);
        if (data.UG.yearOfPassing || data.UG.percentage) setShowUG(true);
        if (data.PG.yearOfPassing || data.PG.percentage) setShowPG(true);
        if (data.PHD.yearOfPassing || data.PHD.percentage) setShowPHD(true);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNestedChange = (e, level) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [level]: {
        ...prevData[level],
        [name]: value
      }
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'showUG') setShowUG(checked);
    if (name === 'showPG') setShowPG(checked);
    if (name === 'showPHD') setShowPHD(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="form-container">
      <h1>Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-section">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-section">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-section">
          <label>
            <input type="checkbox" name="showUG" checked={showUG} onChange={handleCheckboxChange} />
            Undergraduate
          </label>
          {showUG && (
            <div className="education-section">
              <label>Year of Passing:</label>
              <input type="text" name="yearOfPassing" value={formData.UG.yearOfPassing} onChange={(e) => handleNestedChange(e, 'UG')} />
              <label>Percentage:</label>
              <input type="text" name="percentage" value={formData.UG.percentage} onChange={(e) => handleNestedChange(e, 'UG')} />
            </div>
          )}
        </div>
        <div className="form-section">
          <label>
            <input type="checkbox" name="showPG" checked={showPG} onChange={handleCheckboxChange} />
            Postgraduate
          </label>
          {showPG && (
            <div className="education-section">
              <label>Year of Passing:</label>
              <input type="text" name="yearOfPassing" value={formData.PG.yearOfPassing} onChange={(e) => handleNestedChange(e, 'PG')} />
              <label>Percentage:</label>
              <input type="text" name="percentage" value={formData.PG.percentage} onChange={(e) => handleNestedChange(e, 'PG')} />
            </div>
          )}
        </div>
        <div className="form-section">
          <label>
            <input type="checkbox" name="showPHD" checked={showPHD} onChange={handleCheckboxChange} />
            PhD
          </label>
          {showPHD && (
            <div className="education-section">
              <label>Year of Passing:</label>
              <input type="text" name="yearOfPassing" value={formData.PHD.yearOfPassing} onChange={(e) => handleNestedChange(e, 'PHD')} />
              <label>Percentage:</label>
              <input type="text" name="percentage" value={formData.PHD.percentage} onChange={(e) => handleNestedChange(e, 'PHD')} />
            </div>
          )}
        </div>
        <div className="form-section">
          <label>Experience:</label>
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>Resume:</label>
          <input type="text" name="resume" value={formData.resume} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyApplications;
