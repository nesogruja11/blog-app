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
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useApproveBlog } from "../../../hooks/services/useBlog";
import { toast } from "react-toastify";
import { useAddFavouriteBlog } from "../../../hooks/services/useBlog";

function BlogCard(props) {
  const [blog, setBlog] = useState();
  const { showCheckbox } = props;
  const [checked, setChecked] = useState(props.blog?.approved);
  const { mutate: mutateApprove } = useApproveBlog();
  const { mutate: mutateAddFavouriteBlog } = useAddFavouriteBlog();

  const onSubmit1 = (id) => {
    mutateAddFavouriteBlog(blog?.blogId, {
      onSuccess: () => toast.success("Blog je dodat u omiljene!"),
      onError: () =>
        toast.error("Došlo je do greške prilikom dodavanja bloga u omiljene!"),
    });
  };

  const onSubmit = (id) => {
    mutateApprove(blog?.blogId, {
      onSuccess: () => toast.success("Blog je odobren!"),
      onError: () =>
        toast.error("Došlo je do greške prilikom odobravanja bloga!"),
    });
  };

  useEffect(() => {
    if (props.blog) {
      setBlog(props.blog);
      setChecked(props.blog?.approved);
    }
  }, [props.blog]);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div
        key={blog?.blogId}
        style={{
          marginTop: "5px",
          marginLeft: "10px",
        }}
      >
        <Card
          sx={{ maxWidth: 1200, marginBottom: 10 }}
          style={{ backgroundColor: "lightgrey" }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }}>
                {blog?.user.username.charAt(0)}
              </Avatar>
            }
            title={blog?.blogTitle}
            subheader={
              <>
                {blog?.createdAt}
                <br />
                Autor: {blog?.user.username}
                <br />
                Država:{blog?.country?.countryName}
              </>
            }
          />
          <CardMedia
            component="img"
            height="400"
            image={blog?.coverImageUrl}
            alt="Blog"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {blog?.blogContent}
            </Typography>
            <IconButton onClick={onSubmit1} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardContent>
          {showCheckbox && (
            <Box
              display="flex"
              flexDirection="column"
              marginRight={2}
              marginBottom={1}
            >
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Checkbox checked={checked} onChange={handleCheckboxChange} />
                <Typography variant="body1" color="black" marginLeft={1}>
                  Odobri
                </Typography>
              </Box>

              <Box display="flex" justifyContent="flex-end" marginTop={1}>
                <Button
                  type="submit"
                  onClick={onSubmit}
                  //onClick={handleApproveClick}
                  sx={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderRadius: "10px",
                    border: "1px solid black",
                    marginLeft: "auto",
                  }}
                >
                  Sacuvaj
                </Button>
              </Box>
            </Box>
          )}
        </Card>
      </div>
    </>
  );
}

export default BlogCard;
