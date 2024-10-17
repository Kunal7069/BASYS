import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuthReports = () => {
  const [authReport, setAuthReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientNames, setPatientNames] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAuthReport = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://basys-backend-hi5e.onrender.com/api/authorizations/auth_patients');
        setAuthReport(response.data);
        await fetchPatientNames(response.data);
      } catch (error) {
        setError('Error fetching authorization reports');
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthReport();
  }, []);

  const fetchPatientNames = async (reports) => {
    try {
      const patientIds = [...new Set(reports.map((report) => report.patientId))];
      const promises = patientIds.map(async (id) => {
        const response = await axios.post('https://basys-backend-hi5e.onrender.com/api/patients/get_name', { patientId: id });
        return { id, name: response.data.name };
      });

      const names = await Promise.all(promises);
      const namesMap = names.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {});
      setPatientNames(namesMap);
    } catch (error) {
      console.error('Error fetching patient names:', error);
    }
  };

  const filteredAuthReport = authReport.filter((report) =>
    patientNames[report.patientId]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" p-4">
         <div className="flex justify-between mb-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Authorization Reports</h1>
      <div>
        <Link to="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Dashboard
          </Link>
          <Link to="/add-patient" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Add New Patient
          </Link>
         

        </div>
        </div>
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-3 border border-gray-300 rounded mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {loading && <div className="text-center text-gray-600">Loading reports...</div>}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Patient Name</th>
            <th className="border px-4 py-2">Treatment Type</th>
            <th className="border px-4 py-2">Insurance Plan</th>
            <th className="border px-4 py-2">Date Of Service</th>
            <th className="border px-4 py-2">Diagnosis Code</th>
            <th className="border px-4 py-2">Procedure Code</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAuthReport.length > 0 ? (
            filteredAuthReport.map((report) => (
              <tr key={report._id} className="hover:bg-gray-100 transition duration-300">
                <td className="border px-4 py-2">{patientNames[report.patientId]}</td>
                <td className="border px-4 py-2">{report.treatmentType}</td>
                <td className="border px-4 py-2">{report.insurancePlan}</td>
                <td className="border px-4 py-2">{report.dateOfService}</td>
                <td className="border px-4 py-2">{report.diagnosisCode}</td>
                <td className="border px-4 py-2">{report.procedureCode}</td>
                <td  className=" border px-4 py-2 bg-red-500 text-white rounded" >{report.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border px-4 py-2 text-center">No reports found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuthReports;
