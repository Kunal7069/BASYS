import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    condition: '',
    medicalHistory: '',
    treatmentPlan: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://basys-backend-hi5e.onrender.com/api/patients', formData);
      alert(response.data.message); // Display success message
      navigate('/'); // Redirect back to the dashboard
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Error saving patient details');
    }
  };

  return (
    <>
    <div className="p-4">
    <div className="flex justify-between mb-4">
    <h1 className="text-3xl font-bold mb-6 text-center">Add Patients</h1>
    <div>
      <Link to="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Dashboard
        </Link>
        <Link to="/authreports" className="bg-blue-500 text-white px-4 py-2 rounded">
          Auth Reports
        </Link>

      </div>
      </div>
      </div>
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter patient name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter patient age"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Condition</label>
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter condition"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter medical history"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Treatment Plan</label>
          <textarea
            name="treatmentPlan"
            value={formData.treatmentPlan}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            placeholder="Enter treatment plan"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Save Patient
        </button>
      </form>
    </div>
    </>
  );
};

export default AddPatient;
