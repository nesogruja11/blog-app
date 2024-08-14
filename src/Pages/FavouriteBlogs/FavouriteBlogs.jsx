import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { Grid, Typography, Pagination, Box } from "@mui/material";
import { useFavouriteBlogs } from "../../hooks/services/useBlog";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard";

const FavouriteBlogs = () => {
  const { data: favouriteBlogsData } = useFavouriteBlogs();
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);
  const ITEMS_PER_PAGE = 6;
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
      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ textAlign: "center", marginBottom: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333" }}>
              Omiljeni blogovi
            </Typography>
          </Grid>
          <Grid item xs={12} md={10} sx={{ margin: "0 auto" }}>
            {paginatedBlogs.length > 0 ? (
              <Grid container spacing={3}>
                {paginatedBlogs.map((favouriteBlog) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={favouriteBlog.blog.blogId}
                  >
                    <BlogCard blog={favouriteBlog.blog} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "#555" }}
              >
                Korisnik nema omiljenih blogova.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
          >
            <Pagination
              count={Math.ceil(favouriteBlogs.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{ "& .MuiPaginationItem-root": { borderRadius: 2 } }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FavouriteBlogs;
