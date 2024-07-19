import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/contexts/AuthProvider";

export default function ({ allowedRoles, children }) {
  const { hasAccess, checkIfUserIsInRole, isTokenExpired } = useAuth();
  var hasRole = allowedRoles ? false : true;
  allowedRoles?.forEach((role) => {
    if (checkIfUserIsInRole(role)) {
      hasRole = true;
      return;
    }
  });
  return hasAccess() && !isTokenExpired() ? (
    hasRole ? (
      children
    ) : (
      <Navigate to="" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
