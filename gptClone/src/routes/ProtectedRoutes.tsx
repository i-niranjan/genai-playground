import { type JSX } from "react";
import { Navigate } from "react-router";
export default function ProtectedRoutes({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuth = localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/login" replace />;
}
