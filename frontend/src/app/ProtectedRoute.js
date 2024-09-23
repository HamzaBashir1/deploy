"use client"
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(AuthContext); // Assuming you're using a context for auth
  const router = useRouter();

  useEffect(() => {
    // If no token or user role is not allowed, redirect to login
    if (!token || !allowedRoles.includes(role)) {
      router.push("/login"); // Redirect to login if unauthorized
    }
  }, [token, role, allowedRoles, router]);

  // Render children only if the user has access
  if (!token || !allowedRoles.includes(role)) {
    return null; // Or return a loading spinner until redirect
  }

  return children; // Return the protected content if user is authorized
};

export default ProtectedRoute;
