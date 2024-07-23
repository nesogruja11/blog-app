import React from "react";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { Grid } from "@mui/material";
import { useUnapprovedBlogs } from "../../hooks/services/useBlog";

const ApproveBlog = () => {
  const { data: unApprovedBlogsData } = useUnapprovedBlogs();
  //console.log("unApprovedBlogsData:", unApprovedBlogsData);
  return (
    <>
      <ResponsiveAppBar />
      <Grid container marginLeft={5} spacing={3}>
        <Grid item xs={7} marginLeft={40} marginTop={10}>
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
