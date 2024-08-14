import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";

function TopContent(props) {
  return (
    <Box sx={{ margin: 2 }}>
      <Card
        sx={{
          maxWidth: 500,
          marginBottom: 4,
          marginLeft: 5,
          backgroundColor: "#f5f5f5",
          border: "2px solid #1976d2",
          borderRadius: "12px",
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.02)",
          },
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            {props?.title}
          </Typography>
          <Divider sx={{ marginY: 2, borderColor: "#1976d2" }} />
          <Box sx={{ paddingX: 2 }}>
            {props?.array.map((element, index) => (
              <React.Fragment key={index}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    fontSize: "1.1rem",
                    marginBottom: 2,
                  }}
                >
                  {element}
                </Typography>
                {index < props?.array.length - 1 && (
                  <Divider sx={{ marginY: 1, borderColor: "#1976d2" }} />
                )}
              </React.Fragment>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TopContent;
