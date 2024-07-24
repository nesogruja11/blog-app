import React from "react";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { useUnapprovedBlogs } from "../../hooks/services/useBlog";
import { Grid, Typography } from "@mui/material";

const ApproveBlog = () => {
  const { data: unApprovedBlogsData } = useUnapprovedBlogs();
  //console.log("unApprovedBlogsData:", unApprovedBlogsData);
  return (
    <>
      <ResponsiveAppBar />
      <Grid container marginLeft={5} spacing={3}>
        <Grid itemxs={7} marginLeft={85} marginTop={10}>
          <Typography textAlign="center" fontSize={40}>
            Odobravanje blogova
          </Typography>
        </Grid>
        <Grid item xs={7} marginLeft={40} marginTop={2}>
          {unApprovedBlogsData &&
            unApprovedBlogsData?.map((blog) => (
              <BlogCard showCheckbox={true} key={blog.blogId} blog={blog} />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ApproveBlog;
