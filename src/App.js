import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthorizationForm from "./pages/AuthorizationForm";
import AddPatient from "./pages/AddPatient";
import AuthReports from "./pages/AuthReports";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/authreports" element={<ProtectedRoute><AuthReports /></ProtectedRoute>}/>
          <Route path="/patient/:id" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/authorization/new/:id" element={<ProtectedRoute><AuthorizationForm /></ProtectedRoute>}/>
          <Route path="/add-patient" element={<ProtectedRoute><AddPatient /></ProtectedRoute>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
