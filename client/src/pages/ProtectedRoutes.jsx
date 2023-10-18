import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserProvider";

const ProtectedRoutes = ({ children }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoutes;
