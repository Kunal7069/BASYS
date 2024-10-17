import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Modal component
// Modal component
const Modal = ({ patient, onClose }) => {
  if (!patient) return null; // If no patient is selected, don't render anything

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-md w-full relative">
        <button 
          className="absolute top-2 right-2 text-gray-500 text-xl font-bold hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times; {/* Close button */}
        </button>
        <h2 className="text-xl font-bold mb-4">Patient Details</h2>
        <table className="min-w-full bg-white border">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Name</td>
              <td className="border px-4 py-2">{patient.name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Age</td>
              <td className="border px-4 py-2">{patient.age}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Condition</td>
              <td className="border px-4 py-2">{patient.condition}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Medical History</td>
              <td className="border px-4 py-2">{patient.medicalHistory}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Treatment Plan</td>
              <td className="border px-4 py-2">{patient.treatmentPlan}</td>
            </tr>
            
            {/* Add more patient details as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null); // State for selected patient

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/patients?page=${currentPage}`);
        setPatients(response.data.patients);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError('Error fetching patients');
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [currentPage]);

  const handleViewClick = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
  };

  const handleCloseModal = () => {
    setSelectedPatient(null); // Clear the selected patient to close the modal
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <div>
          <Link to="/add-patient" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Add New Patient
          </Link>
          <Link to="/authreports" className="bg-blue-500 text-white px-4 py-2 rounded">
            Auth Reports
          </Link>
        </div>
      </div>

      {loading && <div className="text-center">Loading patients...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {patients.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Condition</th>
              <th className="border px-4 py-2">Actions</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td className="border px-4 py-2">{patient.name}</td>
                <td className="border px-4 py-2">{patient.age}</td>
                <td className="border px-4 py-2">{patient.condition}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleViewClick(patient)} // Handle click to open modal
                    className="text-blue-500"
                  >
                    View
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <Link to={`/authorization/new/${patient._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Submit Request</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No patients found</div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for displaying patient details */}
      <Modal patient={selectedPatient} onClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;
