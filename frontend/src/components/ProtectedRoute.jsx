import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role, allowed }) {
  if (!role) return <Navigate to="/login" />;
  if (!allowed.includes(role)) return <Navigate to="/" />;
  return children;
}
