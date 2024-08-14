import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRoles } from "../../hooks/contexts/AuthProvider";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import WarningIcon from "@mui/icons-material/Warning";

function PrivateRoute({ allowedRoles, children }) {
  const { hasAccess, checkIfUserIsInRole, isTokenExpired } = useAuth();
  let hasRole = allowedRoles ? false : true;
  allowedRoles?.forEach((role) => {
    if (checkIfUserIsInRole(role)) {
      hasRole = true;
      return;
    }
  });

  if (!hasAccess()) {
    return <Navigate to="/login" />;
  }

  if (isTokenExpired()) {
    return <Navigate to="/login" />;
  }

  if (!hasRole) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        position="fixed"
        top={0}
        left={0}
        bgcolor="rgba(0, 0, 0, 0.5)"
        zIndex={9999}
      >
        <Alert
          severity="warning"
          iconMapping={{
            warning: <WarningIcon sx={{ fontSize: 100 }} />,
          }}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "0",
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box",
            fontSize: "25px",
          }}
        >
          <h2>Nemate privilegiju za pristup ovoj stranici.</h2>
        </Alert>
      </Box>
    );
  }

  return children;
}

export default PrivateRoute;
