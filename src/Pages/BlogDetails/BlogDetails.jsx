import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import {
  Button,
  CardMedia,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  Modal,
  Box,
} from "@mui/material";
import { getBlog } from "../../hooks/services/useBlog";
import { useParams } from "react-router-dom";
import { getPictures } from "../../hooks/services/usePicture";
import { useComments, useAddComment } from "../../hooks/services/useComment";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAddPicture } from "../../hooks/services/usePicture";
import { format, parseISO } from "date-fns";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [user, setUser] = useState("");
  const [dateTravel, setDateTravel] = useState("");
  const [country, setCountry] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [pictures, setPictures] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  let { blogId } = useParams();
  const { data: comments } = useComments(blogId);
  const { mutate: mutateAdd } = useAddComment();
  const { mutate: mutateAddPicture } = useAddPicture();

  const { handleSubmit, register, reset } = useForm();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };

  const onSubmitPicture = (data) => {
    const pictureURLsArray = data.pictureURLs
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");
    if (!blogId || blogId === "0") {
      toast.error("Nije pronađen blog.");
      return;
    }
    if (pictureURLsArray.length === 0) {
      toast.error("Nema validnih URL-ova slika.");
      return;
    }

    const requestData = {
      blogId: blogId,
      pictureURLs: pictureURLsArray,
    };
    console.log(requestData);
    mutateAddPicture(requestData, {
      onSuccess: () => {
        toast.success("Uspješno ste dodali sliku!");
        handleCloseModal();
        getPictures(blogId).then((result) => {
          setPictures(result.data);
        });
      },
      onError: (error) => {
        console.error("Greška prilikom dodavanja slika:", error);
        toast.error("Došlo je do greške prilikom dodavanja slike!");
        handleCloseModal();
      },
    });
  };

  const onSubmit = (data) => {
    const commentData = {
      ...data,
      blogId: blogId,
    };
    reset();
    mutateAdd(commentData, {
      onSuccess: () => toast.success("Uspjesno ste dodali komentar!"),
      onError: () =>
        toast.error("Došlo je do greške prilikom komentarisanja bloga!"),
    });
  };

  useEffect(() => {
    if (blogId) {
      getBlog(blogId).then((result) => {
        setBlog(result.data);
      });
    }
  }, [blogId]);

  useEffect(() => {
    if (blogId) {
      getPictures(blogId).then((result) => {
        setPictures(result.data);
      });
    }
  }, [blogId]);

  useEffect(() => {
    if (blog) {
      setBlogTitle(blog.blogTitle);
      setUser(blog.user.username);
      setDateTravel(
        format(parseISO(blog.travelDate.split(".")[0]), "yyyy-MM-dd HH:mm:ss")
      );
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

  const modalBody = (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          margin: "auto",
        }}
      >
        <Button
          sx={{ alignSelf: "flex-end", color: "red", borderRadius: "20px" }}
          onClick={handleCloseModal}
        >
          X
        </Button>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: "red" }}>
          Unesite URL slike
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmitPicture)}
          style={{ width: "100%" }}
        >
          <textarea
            {...register("pictureURLs")}
            name="pictureURLs"
            style={{
              width: "100%",
              height: "60px",
              resize: "none",
              borderColor: "black",
              marginBottom: "1rem",
            }}
          ></textarea>
          <Button
            type="submit"
            sx={{ color: "red", borderRadius: "20px", width: "100%" }}
          >
            Sačuvaj
          </Button>
        </form>
      </Box>
    </Modal>
  );

  return (
    <>
      <ResponsiveAppBar />

      <Grid
        container
        marginLeft={10}
        width={800}
        marginTop={5}
        spacing={3}
        style={{ margin: "auto" }}
      >
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
              <Typography fontWeight="bold">Autor: {user}</Typography>
              <Typography fontWeight="bold">Datum: {dateTravel}</Typography>
              <Typography fontWeight="bold">Država: {country}</Typography>
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
              itemData.map((item, index) => (
                <ImageListItem key={`${item.img}-${index}`}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
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
            onClick={handleOpenModal}
            style={{
              marginTop: "15px",
              background: "#f0f0f0",
              border: "solid 1px black",
              color: "black",
              borderRadius: "30px",
            }}
          >
            Dodaj slike
          </Button>
          {modalBody}
        </Grid>

        <Grid item xs={12}>
          {comments?.map((comment) => (
            <div key={comment.commentId} style={{ marginBottom: "20px" }}>
              <textarea
                style={{
                  width: "600px",
                  height: "100px",
                  resize: "none",
                }}
                defaultValue={`${format(
                  parseISO(comment.createdAt.split(".")[0]),
                  "yyyy-MM-dd HH:mm:ss"
                )}\nAutor: ${comment.username}\n\n${comment.commentContent}`}
                readOnly
              />
            </div>
          ))}
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} marginLeft={3}>
            <textarea
              {...register("commentContent")}
              placeholder="Unesite komentar..."
              style={{
                width: "600px",
                height: "50px",
                resize: "none",
              }}
            ></textarea>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              style={{
                marginTop: "10px",
                marginLeft: "550px",
                background: "#f0f0f0",
                border: "solid 1px black",
                color: "black",
                borderRadius: "30px",
              }}
            >
              Pošalji
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default BlogDetails;
