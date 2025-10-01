import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../../src/services/authService";

interface Props {
  children: React.ReactNode;
}

export default function RequireAdmin({ children }: Props) {
  const token = getToken();
  const role = getUserRole(); // authService içinde decode edip role döndürüyor olmalı

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
