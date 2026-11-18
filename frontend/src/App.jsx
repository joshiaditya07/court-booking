import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Courts from "./pages/Courts.jsx";
import CourtDetail from "./pages/CourtDetail.jsx";
import CourtForm from "./pages/CourtForm.jsx";
import MyCourts from "./pages/MyCourts.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const App = () => (
  <>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Courts /></ProtectedRoute>} />
        <Route path="/courts/:id" element={<ProtectedRoute><CourtDetail /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-court" element={<ProtectedRoute><CourtForm /></ProtectedRoute>} />
        <Route path="/edit-court/:id" element={<ProtectedRoute><CourtForm /></ProtectedRoute>} />
        <Route path="/my-courts" element={<ProtectedRoute><MyCourts /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </main>
  </>
);

export default App;
