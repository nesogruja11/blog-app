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

  return (
    <>
      <ResponsiveAppBar />
      <Grid container marginLeft={5} spacing={3}>
        <Grid item xs={3} marginTop={5} marginBottom={5}>
          <TextField
            id="outlined-basic"
            label="Pretraga po naslovu"
            variant="outlined"
            style={{ width: 300 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item marginTop={5} marginBottom={5} xs={3}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            label="Država"
            style={{ width: 300 }}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <Typography color={"grey"}>Država</Typography>;
              }
              return selected;
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
        <Grid item marginTop={7} marginBottom={5} xs={3}>
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Traži
          </Button>
        </Grid>
        <Grid item marginTop={7} marginBottom={5} xs={3}>
          <Link to="/add-blog">
            <Button variant="contained" endIcon={<AddCircleOutlineIcon />}>
              Novi blog
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={7} marginLeft={5}>
            {filteredBlogs &&
              filteredBlogs.map((blog) => (
                <BlogCard key={blog.blogId} blog={blog} />
              ))}
          </Grid>
          <Grid item xs={4}>
            <TopContent
              title="Top autori"
              array={topFiveUsers.map(
                (user) => `${user.firstName} ${user.lastName}`
              )}
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
