import React, { useState } from "react";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { useUnapprovedBlogs } from "../../hooks/services/useBlog";
import { Grid, Typography, Pagination } from "@mui/material";

const ITEMS_PER_PAGE = 5;

const ApproveBlog = () => {
  const { data: unApprovedBlogsData } = useUnapprovedBlogs();
  const [currentPage, setCurrentPage] = useState(1);

  // Paginate unApprovedBlogsData
  const paginatedBlogs = unApprovedBlogsData
    ? unApprovedBlogsData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Grid container marginLeft={5} spacing={3}>
        <Grid item xs={12} sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography fontSize={40}>Odobravanje blogova</Typography>
        </Grid>
        <Grid item xs={12} md={10} sx={{ marginLeft: "auto", marginTop: 2 }}>
          {paginatedBlogs.map((blog) => (
            <BlogCard showCheckbox={true} key={blog.blogId} blog={blog} />
          ))}
        </Grid>
        <Grid
          item
          xs={7}
          marginLeft={40}
          marginTop={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={Math.ceil(
              (unApprovedBlogsData?.length || 0) / ITEMS_PER_PAGE
            )}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ApproveBlog;
