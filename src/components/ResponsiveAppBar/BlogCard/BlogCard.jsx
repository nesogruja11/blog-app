import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useBlogs } from "../../../hooks/services/useBlog";

function BlogCard() {
  const { data: blogsData } = useBlogs();

  return (
    <>
      {blogsData &&
        blogsData.map((blog) => (
          <div
            key={blog.blogId}
            style={{
              marginTop: "5px",
              marginLeft: "10px",
            }}
          >
            <Card
              sx={{ maxWidth: 1200, marginBottom: 10 }}
              style={{ backgroundColor: "lightgrey" }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    {blog.user.username.charAt(0)}
                  </Avatar>
                }
                title={blog.blogTitle}
                subheader={
                  <>
                    {blog.createdAt}
                    <br />
                    Autor: {blog.user.username}
                  </>
                }
              />
              <CardMedia
                component="img"
                height="400"
                image={blog.coverImageUrl}
                alt="Blog"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {blog.blogContent}
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
        ))}
    </>
  );
}

export default BlogCard;
