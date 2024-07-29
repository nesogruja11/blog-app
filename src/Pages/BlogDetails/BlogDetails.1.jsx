import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import {
  Button,
  CardMedia,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { getBlog } from "../../hooks/services/useBlog";
import { useParams } from "react-router-dom";
import { getPictures } from "../../hooks/services/usePicture";

export const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  let { blogId } = useParams();
  const [blogTitle, setBlogTitle] = useState("");
  const [user, setUser] = useState("");
  const [dateTravel, setDateTravel] = useState("");
  const [country, setCountry] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    if (blogId) {
      getBlog(blogId).then((result) => {
        setBlog(result.data);
      });
      getPictures(blogId).then((result) => {
        console.log(result);
        if (Array.isArray(result)) {
          setPictures(result.data);
        }
      });
    }
  }, [blogId]);

  useEffect(() => {
    if (blog) {
      setBlogTitle(blog.blogTitle);
      setUser(blog.user.username);
      setDateTravel(blog.travelDate);
      setCountry(blog.country.countryName);
      setCoverImage(blog.coverImageUrl);
      setBlogContent(blog.blogContent);
    }
  }, [blog]);

  const itemData = pictures
    ? pictures.map((picture) => ({
        img: picture.pictureUrl,
      }))
    : [];
  return (
    <>
      <ResponsiveAppBar />

      <Grid container marginLeft={10} width={800} marginTop={5} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">{blogTitle}</Typography>
        </Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={12} marginLeft={3}>
            <CardMedia
              component="img"
              style={{ width: "350px", height: "250px" }}
              image={coverImage}
              alt="Blog"
            />
          </Grid>
          <Grid>
            <Grid item xs={12} marginLeft={10} width={400}>
              <Typography fontWeight="bold">Autor:{user}</Typography>
              <Typography fontWeight="bold">Datum:{dateTravel}</Typography>
              <Typography fontWeight="bold">Država:{country}</Typography>
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <Typography marginRight={20}>{blogContent}</Typography>
        </Grid>
        <Grid item>
          <Typography fontWeight="bold">Slike</Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageList sx={{ width: 600, height: 600 }} cols={3}>
            {itemData &&
              itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    /**srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}*/
                    srcSet={`${item.img}`}
                    src={`${item.img}`}
                    alt="Slika"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </Grid>
        <Grid item>
          <Typography marginTop={10} fontWeight="bold">
            Komentari
          </Typography>
        </Grid>

        <Grid item marginLeft={45}>
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
