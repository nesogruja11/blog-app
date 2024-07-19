import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./TopContent.css";

function TopContent(props) {
  return (
    <>
      <div className="top-content-container">
        <Card
          sx={{ maxWidth: 600, marginBottom: 10, marginLeft: 10 }}
          style={{ backgroundColor: "lightgrey" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {props?.title}
            </Typography>
            <div>
              {props?.array.map((element, index) => (
                <p key={`${element}-${index}`}>{element}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default TopContent;
