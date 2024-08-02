import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { Grid, Typography, Pagination } from "@mui/material";
import { useFavouriteBlogs } from "../../hooks/services/useBlog";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard";

const FavouriteBlogs = () => {
  const { data: favouriteBlogsData } = useFavouriteBlogs();
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedBlogs = favouriteBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setFavouriteBlogs(favouriteBlogsData || []);
  }, [favouriteBlogsData]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Grid container spacing={3} sx={{ marginLeft: 5 }}>
        <Grid item xs={12} sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography fontSize={40}>Omiljeni blogovi</Typography>
        </Grid>
        <Grid item xs={12} md={10} sx={{ marginLeft: "auto", marginTop: 2 }}>
          {paginatedBlogs.map((favouriteBlog) => (
            <BlogCard
              key={favouriteBlog.blog.blogId}
              blog={favouriteBlog.blog}
            />
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil(favouriteBlogs.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FavouriteBlogs;
