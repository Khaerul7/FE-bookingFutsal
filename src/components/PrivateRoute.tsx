import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("rul09_admin_token");
  return token ? <>{children}</> : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
