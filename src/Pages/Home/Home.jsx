import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BlogCard from "../../components/ResponsiveAppBar/BlogCard/BlogCard.jsx";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar.jsx";
import TopContent from "../../components/TopContent/TopContent.jsx";
import { useApprovedBlogs } from "../../hooks/services/useBlog.js";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useCountries } from "../../hooks/services/useCountry";

function Home() {
  const { data: approvedBlogsData } = useApprovedBlogs();
  const [approvedBlogs, setApprovedBlogs] = useState();
  const [countries, setCountries] = React.useState("");
  const { data: countriesData } = useCountries();

  const handleChange = (event) => {
    setCountries(event.target.value);
  };

  useEffect(() => {
    setApprovedBlogs(approvedBlogsData);
  }, [approvedBlogsData]);

  return (
    <>
      <ResponsiveAppBar />
      <Grid container marginLeft={5} spacing={3} sty>
        <Grid item xs={3} marginTop={5} marginBottom={5}>
          <TextField
            id="outlined-basic"
            label="Pretraga po naslovu"
            variant="outlined"
            style={{ width: 300 }}
          />
        </Grid>
        <Grid item marginTop={5} marginBottom={5} xs={3}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={countries}
            label="Age"
            onChange={handleChange}
            style={{ width: 300 }}
          >
            {countriesData?.map((country) => (
              <MenuItem value={country.countryId} key={country.countryId}>
                {country.countryName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item marginTop={7} marginBottom={5} xs={3}>
          <Button variant="contained" endIcon={<SearchIcon />}>
            Traži
          </Button>
        </Grid>
        <Grid item marginTop={7} marginBottom={5} xs={3}>
          <Button variant="contained" endIcon={<AddCircleOutlineIcon />}>
            Novi blog
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </Grid>
          <Grid item xs={4}>
            <TopContent
              title="Top autori"
              array={[
                "Marko Marković",
                "Marko Marković",
                "Marko Marković",
                "Marko Marković",
                "Marko Marković",
              ]}
            />
            <TopContent
              title="Top blogovi"
              array={["Blog 1", "Blog 2", "Blog 3", "Blog 4"]}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
