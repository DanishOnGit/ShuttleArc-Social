import { Navigate, Route } from "react-router";
import { useAuth } from "../authentication/authenticationSlice";

export const PrivateRoute = ({ path, element }) => {
  const { token } = useAuth();
  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate replace to="/" />
  );
};
