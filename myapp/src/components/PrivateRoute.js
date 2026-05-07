import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");

  // 🔴 BLOCK if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;