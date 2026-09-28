import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Results from "./pages/Results.jsx";
import ResourcePage from "./pages/ResourcePage.jsx";

const wrap = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={wrap(<Dashboard />)} />
      <Route path="/faculties" element={wrap(<ResourcePage resourceKey="faculty" />)} />
      <Route path="/departments" element={wrap(<ResourcePage resourceKey="department" />)} />
      <Route path="/sessions" element={wrap(<ResourcePage resourceKey="session" />)} />
      <Route path="/semesters" element={wrap(<ResourcePage resourceKey="semester" />)} />
      <Route path="/courses" element={wrap(<ResourcePage resourceKey="course" />)} />
      <Route path="/lecturers" element={wrap(<ResourcePage resourceKey="lecturer" />)} />
      <Route path="/students" element={wrap(<ResourcePage resourceKey="student" />)} />
      <Route path="/offerings" element={wrap(<ResourcePage resourceKey="offering" />)} />
      <Route path="/enrollments" element={wrap(<ResourcePage resourceKey="enrollment" />)} />
      <Route path="/results" element={wrap(<Results />)} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
