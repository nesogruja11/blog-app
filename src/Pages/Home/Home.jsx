import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard.jsx";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar.jsx";
import TopContent from "../../components/TopContent/TopContent.jsx";
import { useState, useEffect } from "react";
import { TextField, Typography, Select, MenuItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useCountries } from "../../hooks/services/useCountry";
import { Link } from "react-router-dom";
import { useTopFiveBlogs } from "../../hooks/services/useBlog";
import { useTopFiveUsers } from "../../hooks/services/useAuthentication.js";
import { useBlogs } from "../../hooks/services/useBlog";
import Pagination from "@mui/material/Pagination";

function Home() {
  const [countries, setCountries] = useState("");
  const { data: countriesData } = useCountries();

  const { data: topBlogsData } = useTopFiveBlogs();
  const [topFiveBlogs, setTopFiveBlogs] = useState([]);

  const { data: topUsersData } = useTopFiveUsers();
  const [topFiveUsers, setTopFiveUsers] = useState([]);

  const { data: allBlogsData } = useBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  const filterBlogs = () => {
    if (!allBlogsData) return;

    const cleanedSearchTerm = searchTerm.trim().toLowerCase();
    const cleanedSelectedCountry = selectedCountry.trim().toLowerCase();

    const filteredByTitle = allBlogsData.filter((blog) =>
      blog.blogTitle.toLowerCase().includes(cleanedSearchTerm)
    );

    const filteredByCountry = cleanedSelectedCountry
      ? filteredByTitle.filter((blog) =>
          blog.country.countryName
            .trim()
            .toLowerCase()
            .includes(cleanedSelectedCountry)
        )
      : filteredByTitle;

    setFilteredBlogs(filteredByCountry);
  };

  const handleSearch = () => {
    setIsSearchClicked(true);
    filterBlogs();
  };

  useEffect(() => {
    if (allBlogsData) {
      if (!isSearchClicked) {
        setFilteredBlogs(allBlogsData);
      }
    }
  }, [allBlogsData]);

  useEffect(() => {
    if (topBlogsData) {
      setTopFiveBlogs(topBlogsData);
    }
  }, [topBlogsData]);

  useEffect(() => {
    if (topUsersData) {
      setTopFiveUsers(topUsersData);
    }
  }, [topUsersData]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="search-title"
              label="Pretraga po naslovu"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: 1,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Select
              labelId="select-country"
              id="select-country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <Typography color={"grey"}>Država</Typography>;
                }
                return selected;
              }}
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              {countriesData?.map((country) => (
                <MenuItem
                  value={country.countryName}
                  key={`country-${country.countryId}`}
                >
                  {country.countryName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={handleSearch}
              fullWidth
              sx={{
                borderRadius: 1,
                boxShadow: 1,
                textTransform: "none",
              }}
            >
              Traži
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/add-blog">
              <Button
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                fullWidth
                sx={{
                  borderRadius: 1,
                  boxShadow: 1,
                  textTransform: "none",
                }}
              >
                Novi blog
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.blogId} blog={blog} />
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <Pagination
                  count={Math.ceil(filteredBlogs.length / blogsPerPage)}
                  page={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  color="primary"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <TopContent
              title="Top autori"
              array={topFiveUsers.map(
                (user) => `${user.firstName} ${user.lastName}`
              )}
              sx={{ mb: 3 }}
            />
            <TopContent
              title="Top blogovi"
              array={topFiveBlogs.map((blog) => blog.blogTitle)}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
