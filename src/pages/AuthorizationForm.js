import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthorizationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    treatmentType: '',
    insurancePlan: '',
    dateOfService: '',
    diagnosisCode: '',
    procedureCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/authorizations', {
        patientId: id,
        ...formData,
      });
      alert('Prior authorization request submitted!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Submit Prior Authorization</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Treatment Type</label>
          <input
            type="text"
            name="treatmentType"
            value={formData.treatmentType}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter treatment type"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Insurance Plan</label>
          <input
            type="text"
            name="insurancePlan"
            value={formData.insurancePlan}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter insurance plan"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date of Service</label>
          <input
            type="date"
            name="dateOfService"
            value={formData.dateOfService}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Diagnosis Code</label>
          <input
            type="text"
            name="diagnosisCode"
            value={formData.diagnosisCode}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter diagnosis code"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Procedure Code</label>
          <input
            type="text"
            name="procedureCode"
            value={formData.procedureCode}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter procedure code"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthorizationForm;
