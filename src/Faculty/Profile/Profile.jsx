import React, { useState, useEffect } from 'react';
import './Profile.css';
import { API_URL } from '../../data/apipath';
import Navbar from '../HomeComponents/Navbar';

const Profile = () => {
  const [formData, setFormData] = useState({
    _id: '',
    Name: '',
    email: '',
    password: '',
    UG: [{ yearOfPassing: '', percentage: '' }],
    PG: [{ yearOfPassing: '', percentage: '' }],
    PHD: [{ yearOfPassing: '', percentage: '' }],
    Experience: '',
    Resume: ''
  });

  const [showUG, setShowUG] = useState(false);
  const [showPG, setShowPG] = useState(false);
  const [showPHD, setShowPHD] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    fetch(`${API_URL}/faculty/mydetails`, {
      method: 'GET',
      headers: {
        'token': `${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setFormData({
          ...data,
          UG: data.UG.length ? data.UG : [{ yearOfPassing: '', percentage: '' }],
          PG: data.PG.length ? data.PG : [{ yearOfPassing: '', percentage: '' }],
          PHD: data.PHD.length ? data.PHD : [{ yearOfPassing: '', percentage: '' }],
        });
        setShowUG(data.UG.length > 0);
        setShowPG(data.PG.length > 0);
        setShowPHD(data.PHD.length > 0);
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
      [level]: [{
        ...prevData[level][0],
        [name]: value
      }]
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'showUG') setShowUG(checked);
    if (name === 'showPG') setShowPG(checked);
    if (name === 'showPHD') setShowPHD(checked);
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('loginToken');

    const formDataToSend = new FormData();
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('UG', JSON.stringify(formData.UG));
    formDataToSend.append('PG', JSON.stringify(formData.PG));
    formDataToSend.append('PHD', JSON.stringify(formData.PHD));
    formDataToSend.append('Experience', formData.Experience);
    if (resumeFile) {
      formDataToSend.append('Resume', resumeFile);
    }

    fetch(`${API_URL}/faculty/facultymodify`, {
      method: 'PUT',
      headers: {
        'token': `${token}`
      },
      body: formDataToSend
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Data added successfully');
        setIsEditing(false); // Disable editing after submitting
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="main">
      <Navbar/>
      <div className="form-container" style={{marginTop:"10px"}}>
      <h1>Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Name:</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} disabled={!isEditing} required />
        </div>
        <div className="form-section">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} required />
        </div>
        {/* <div className="form-section">
          <label>Password:</label>
          <input type="text" name="password" value={formData.password} onChange={handleChange} disabled={!isEditing} required />
        </div> */}
        <div className="form-section">
          <label>
            <input type="checkbox" name="showUG" checked={showUG} onChange={handleCheckboxChange} disabled={!isEditing} />
            Undergraduate
          </label>
          {showUG && (
            <div className="education-section">
              <label>Year of Passing:</label>
              <input type="text" name="yearOfPassing" value={formData.UG[0].yearOfPassing} onChange={(e) => handleNestedChange(e, 'UG')} disabled={!isEditing} />
              <label>Percentage:</label>
              <input type="text" name="percentage" value={formData.UG[0].percentage} onChange={(e) => handleNestedChange(e, 'UG')} disabled={!isEditing} />
            </div>
          )}
        </div>
        <div className="form-section">
          <label>
            <input type="checkbox" name="showPG" checked={showPG} onChange={handleCheckboxChange} disabled={!isEditing} />
            Postgraduate
          </label>
          {showPG && (
            <div className="education-section">
              <label>Year of Passing:</label>
              <input type="text" name="yearOfPassing" value={formData.PG[0].yearOfPassing} onChange={(e) => handleNestedChange(e, 'PG')} disabled={!isEditing} />
              <label>Percentage:</label>
              <input type="text" name="percentage" value={formData.PG[0].percentage} onChange={(e) => handleNestedChange(e, 'PG')} disabled={!isEditing} />
            </div>
          )}
        </div>
        <div className="form-section">
          <label>
            <input type="checkbox" name="showPHD" checked={showPHD} onChange={handleCheckboxChange} disabled={!isEditing} />
            PhD
          </label>
          {showPHD && (
            <div className="education-section">
              <label>Year of Passing:</label>
              <input type="text" name="yearOfPassing" value={formData.PHD[0].yearOfPassing} onChange={(e) => handleNestedChange(e, 'PHD')} disabled={!isEditing} placeholder='If not enter persuing year Ex:1st year or 2nd year'/>
              <label>Percentage:</label>
              <input type="text" name="percentage" value={formData.PHD[0].percentage} onChange={(e) => handleNestedChange(e, 'PHD')} disabled={!isEditing} />
            </div>
          )}
        </div>
        <div className="form-section">
          <label>Experience:</label>
          <input type="text" name="Experience" value={formData.Experience} onChange={handleChange} disabled={!isEditing} />
        </div>
        <div className="form-section">
          <label>Resume:</label>
          <input type="file" name="Resume" onChange={handleFileChange} disabled={!isEditing} />
          {formData.Resume && (
            <div>
              <a href={`${API_URL}/uploads/${formData.Resume}`} target="" rel="noopener noreferrer">Download Current Resume</a>
            </div>
          )}
        </div>
        <div className="buttns" style={{display:"flex" , gap:"10px"}}>
        <button type="submit" disabled={!isEditing}>Submit</button>
        {!isEditing && <button type="button" onClick={handleEdit} style={{ marginLeft:"" }}>Edit</button>}
        </div>
      </form>
    </div>
    </div>
  );
};

export default Profile;
