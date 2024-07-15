import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import blog from "../../../assets/img/blog.jpg";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { CenterFocusStrong } from "@mui/icons-material";
function BlogCard() {
  const handleClickOnLink = () => {
    alert("click on blog link");
  };

  return (
    <>
      <div
        style={{
          marginTop: "5px",
          marginLeft: "10px",
        }}
      >
        <Card sx={{ maxWidth: 1000 }} style={{ backgroundColor: "lightgrey" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Naslov bloga"
            subheader="Jul 15, 2024"
          ></CardHeader>
          <CardMedia component="img" height="400" image={blog} alt="Blog" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Blog je web lokacija, nešto kao internetski dnevnik ili
              informativna web stranica, koji je se bavi pisanjem sadržaja iz
              jedne ili više odabranih tema. Sadržaj se piše u obliku blog
              članaka (ili blog postova) koji se na blogu prikazuju obrnutim
              kronološkim redoslijedom.
            </Typography>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default BlogCard;
