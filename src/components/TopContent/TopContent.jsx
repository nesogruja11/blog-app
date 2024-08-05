import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "./TopContent.css";

function TopContent(props) {
  return (
    <div className="top-content-container">
      <Card
        sx={{
          maxWidth: 500,
          marginBottom: 10,
          marginLeft: 10,
          backgroundColor: "#f0f0f0",
          border: "2px solid #1976d2",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "#333",
              fontWeight: "bold",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            {props?.title}
          </Typography>
          <Divider sx={{ marginY: 2, border: "1px solid #1976d2" }} />
          <div>
            {props?.array.map((element, index) => (
              <React.Fragment key={index}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#007bff",
                    fontSize: "1.2rem",
                    marginBottom: 1,
                  }}
                >
                  {element}
                </Typography>
                {index < props?.array.length - 1 && (
                  <Divider sx={{ marginY: 1, border: "1px solid #1976d2" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TopContent;
