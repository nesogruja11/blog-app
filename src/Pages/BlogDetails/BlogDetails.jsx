import React from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const BlogDetails = () => {
  const imageList = [
    "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnDleeVQXrAgCqIJ3W-SbQ2Yc8khyjHBjf4g&s",
  ];
  return (
    <>
      <ResponsiveAppBar />
      <Grid container marginLeft={10} marginTop={5} spacing={3}>
        <Grid item xs={12}>
          <Typography fontSize={40}>Naslov bloga</Typography>
        </Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={12} marginLeft={3}>
            <CardMedia
              component="img"
              style={{ width: "300px", height: "200px" }}
              image="https://static.vecteezy.com/system/resources/thumbnails/025/181/412/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
              alt="Blog"
            />
          </Grid>
          <Grid>
            <Grid item xs={12} marginLeft={10}>
              <Typography fontWeight="bold">Autor:</Typography>
              <Typography fontWeight="bold">Datum:</Typography>
              <Typography fontWeight="bold">Država:</Typography>
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <Typography marginRight={20}>
            Naš blog je digitalna platforma koja vas vodi kroz raznolike teme i
            sagledava ih iz svežih perspektiva. Naš cilj je da vam pružimo
            obrazovne i inspirativne sadržaje koji će vas informisati, zabaviti
            i nadahnuti. Bilo da istražujemo najnovije tehnološke inovacije,
            delimo autentična putnička iskustva, istražujemo dubine umetnosti
            ili vam pružamo praktične savete za unapređenje vašeg svakodnevnog
            života, naš blog je vaša digitalna destinacija za istraživanje,
            učenje i otkrivanje.
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontWeight="bold">Slike</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {imageList.map((urlSlike, index) => (
              <Grid item key={index}>
                <CardMedia
                  component="img"
                  style={{ width: "300px", height: "200px" }}
                  image={urlSlike}
                  alt={`Slika ${index + 1}`}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item>
            <Button
              style={{
                marginTop: "15px",
                background: "#f0f0f0",
                border: "solid 1px black",
                color: "black",
                borderRadius: "30px",
              }}
            >
              Dodaj sliku
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <Typography fontWeight="bold">Komentari</Typography>
        </Grid>
        <Grid item xs={12}>
          <textarea
            style={{
              width: "600px",
              height: "50px",
            }}
          ></textarea>
        </Grid>
        <Grid item xs={12}>
          <textarea
            placeholder="Unesite komentar..."
            style={{
              width: "600px",
              height: "50px",
            }}
          ></textarea>
        </Grid>
        <Grid item>
          <Button
            style={{
              marginLeft: "530px",
              background: "#f0f0f0",
              border: "solid 1px black",
              color: "black",
              borderRadius: "30px",
            }}
          >
            Pošalji
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BlogDetails;
