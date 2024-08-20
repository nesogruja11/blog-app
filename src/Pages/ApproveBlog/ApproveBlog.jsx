import React, { useState, useEffect } from "react";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { useUnapprovedBlogs } from "../../hooks/services/useBlog";
import { Grid, Typography, Pagination, Box } from "@mui/material";

const ApproveBlog = () => {
  const { data: unApprovedBlogsData } = useUnapprovedBlogs();
  const [unApprovedBlogs, setUnApprovedBlogs] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const paginatedBlogs = unApprovedBlogsData
    ? unApprovedBlogsData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (unApprovedBlogsData) {
      setUnApprovedBlogs(unApprovedBlogsData);
      console.log("aa");
    }
  }, [unApprovedBlogsData]);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ textAlign: "center", marginBottom: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333" }}>
              Odobravanje blogova
            </Typography>
          </Grid>
          <Grid item xs={12} md={10} sx={{ margin: "0 auto" }}>
            {paginatedBlogs.length > 0 ? (
              <Grid container spacing={3}>
                {paginatedBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog.blogId}>
                    <BlogCard showCheckbox={true} blog={blog} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "#555" }}
              >
                Nema blogova za odobriti.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
          >
            <Pagination
              count={Math.ceil((unApprovedBlogs?.length || 0) / ITEMS_PER_PAGE)}
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

export default ApproveBlog;
