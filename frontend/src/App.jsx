import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import OTs from "./pages/OTs";
import Surgeries from "./pages/Surgeries";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

export default function App() {
  const [role, setRole] = useState(null);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/register" element={<Register setRole={setRole} />} />

        <Route path="/dashboard" element={
          <ProtectedRoute role={role} allowed={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/doctors" element={
          <ProtectedRoute role={role} allowed={["admin","user"]}>
            <Doctors role={role} />
          </ProtectedRoute>
        } />

        <Route path="/patients" element={
          <ProtectedRoute role={role} allowed={["admin"]}>
            <Patients role={role} />
          </ProtectedRoute>
        } />

        <Route path="/ots" element={
          <ProtectedRoute role={role} allowed={["admin"]}>
            <OTs role={role} />
          </ProtectedRoute>
        } />

        <Route path="/surgeries" element={
          <ProtectedRoute role={role} allowed={["admin","user"]}>
            <Surgeries role={role} />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute role={role} allowed={["admin","user"]}>
            <Profile role={role} setRole={setRole} />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
