import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { Grid, Typography } from "@mui/material";
import { useFavouriteBlogs } from "../../hooks/services/useBlog";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard";

const FavouriteBlogs = () => {
  const { data: favouriteBlogsData } = useFavouriteBlogs();
  const [favouriteBlogs, setFavouriteBlogs] = useState();

  useEffect(() => {
    setFavouriteBlogs(favouriteBlogsData);
  }, [favouriteBlogsData]);

  return (
    <>
      <ResponsiveAppBar />
      <Grid container marginLeft={5} spacing={3}>
        <Grid item xs={7} marginLeft={40} marginTop={5}>
          <Typography textAlign="center" fontSize={40}>
            Omiljeni blogovi
          </Typography>
        </Grid>
        <Grid item xs={7} marginLeft={40} marginTop={2}>
          {favouriteBlogs?.map((favouriteBlog) => (
            <BlogCard
              key={favouriteBlog.blog.blogId}
              blog={favouriteBlog.blog}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default FavouriteBlogs;
