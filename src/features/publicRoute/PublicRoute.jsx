import { Navigate, Route } from "react-router";
import { useAuth } from "../authentication/authenticationSlice";

export const PublicRoute = ({ path, element }) => {
  const { token } = useAuth();
  return token ? (
    <Navigate replace to="/home" />
  ) : (
    <Route path={path} element={element} />
  );
};
