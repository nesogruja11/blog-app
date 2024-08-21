import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useApproveBlog } from "../../../hooks/services/useBlog";
import { toast } from "react-toastify";
import { useAddFavouriteBlog } from "../../../hooks/services/useBlog";
import { useRemoveFavouriteBlog } from "../../../hooks/services/useBlog";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function BlogCard(props) {
  const [blog, setBlog] = useState();
  const { showCheckbox } = props;
  const [checked, setChecked] = useState(props.blog?.approved);
  const [isFavourite, setIsFavourite] = useState(props.blog?.favourite);
  const { mutate: mutateApprove } = useApproveBlog();
  const { mutate: mutateAddFavouriteBlog } = useAddFavouriteBlog();
  const { mutate: mutateRemoveFavouriteBlog } = useRemoveFavouriteBlog();
  const [blogId, setBlogId] = useState(null);
  const [approved, setApproved] = useState(props.blog?.approved);

  const handleFavouriteClick = () => {
    if (isFavourite) {
      mutateRemoveFavouriteBlog(blog?.blogId, {
        onSuccess: () => {
          toast.success("Blog je uklonjen iz liste omiljenih!");
          setIsFavourite(false);
        },
        onError: () =>
          toast.error(
            "Došlo je do greške prilikom uklanjanja bloga iz liste omiljenih!"
          ),
      });
    } else {
      mutateAddFavouriteBlog(blog?.blogId, {
        onSuccess: () => {
          toast.success("Blog je dodat u omiljene!");
          setIsFavourite(true);
        },
        onError: () =>
          toast.error(
            "Došlo je do greške prilikom dodavanja bloga u omiljene!"
          ),
      });
    }
  };

  const onSubmit = (id) => {
    mutateApprove(blog?.blogId, {
      onSuccess: () => {
        toast.success("Blog je odobren!");
        setApproved(true);
      },
      onError: () =>
        toast.error("Došlo je do greške prilikom odobravanja bloga!"),
    });
  };

  useEffect(() => {
    if (props.blog) {
      setBlog(props.blog);
      setChecked(props.blog?.approved);
      setBlogId(props.blog?.blogId);
      setIsFavourite(props.blog?.favourite);
      setApproved(props.blog?.approved);
    }
  }, [props.blog]);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const formattedDate = blog?.travelDate
    ? dayjs(blog.travelDate).format("YYYY-MM-DD")
    : "";

  return (
    <Card
      sx={{
        maxWidth: 1200,
        marginBottom: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.02)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {blog?.user.username.charAt(0)}
          </Avatar>
        }
        title={
          <Link
            to={`/blog-details/${blogId}`}
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {blog?.blogTitle}
          </Link>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
            <br />
            Autor: {blog?.user.username}
            <br />
            Država: {blog?.country?.countryName}
          </Typography>
        }
        sx={{ padding: 2 }}
      />
      <CardMedia
        component="img"
        height="400"
        image={blog?.coverImageUrl}
        alt="Blog"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog?.blogContent}
        </Typography>
        {approved && (
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
            <IconButton
              onClick={handleFavouriteClick}
              aria-label="add to favorites"
            >
              <FavoriteIcon
                sx={{ color: isFavourite ? red[500] : "inherit" }}
              />
            </IconButton>
          </Box>
        )}
      </CardContent>
      {showCheckbox && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: 2,
            borderTop: "1px solid #e0e0e0",
            paddingTop: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 1,
            }}
          >
            <Checkbox checked={checked} onChange={handleCheckboxChange} />
            <Typography variant="body1" color="text.primary">
              Odobri
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}
          >
            <Button
              type="submit"
              onClick={onSubmit}
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "20px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Sačuvaj
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default BlogCard;
