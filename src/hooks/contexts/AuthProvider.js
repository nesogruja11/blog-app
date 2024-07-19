import React, { useContext, useState } from "react";
import decode from "jwt-decode";

const AuthContext = React.createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token-app"));

  const storeToken = (jwtToken) => {
    localStorage.setItem("token-app", jwtToken);
    setToken(jwtToken);
  };

  const getToken = () => {
    return localStorage.getItem("token-app");
  };

  const hasAccess = () => {
    return token ? true : false;
  };

  const clearToken = () => {
    localStorage.clear("token-app");
    setToken();
  };

  const checkIfUserIsInRole = (role) => {
    if (token) {
      let decodedToken = decode(token);
      return decodedToken.role?.some((x) => x == role);
    }
    return false;
  };

  const getFullName = () => {
    if (token) {
      let decodedToken = decode(token);
      return decodedToken.firstName + " " + decodedToken.lastName;
    }
  };

  // use for accesing some route
  const canAccessUserRoute = () => {
    return checkIfUserIsInRole(UserRoles.ADMIN);
  };

  const logout = () => {
    clearToken();
    window.location.reload(true);
  };

  const isTokenExpired = () => {
    if (token) {
      let decodedToken = decode(token);
      let expiredDate = new Date(decodedToken.exp * 1000);
      let currentDate = new Date();
      if (expiredDate < currentDate) {
        return true;
      } else {
        return false;
      }
    }
  };

  const value = {
    storeToken,
    clearToken,
    token,
    getToken,
    hasAccess,
    getFullName,
    logout,
    checkIfUserIsInRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const UserRoles = {
  ADMIN: "ADMIN",
  USER: "USER",
};
