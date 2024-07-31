import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Box,
  Avatar,
} from "@mui/material";
import { teal, grey, blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BlogIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import { getRoles } from "../../hooks/services/useAuthentication";
import { useEffect } from "react";

const UserCard = ({ user }) => {
  const formatActiveStatus = (isActive) => (isActive ? "Aktivan" : "Neaktivan");
  const getInitial = (username) => {
    if (username) {
      return username.charAt(0).toUpperCase();
    }
    return "?"; // ako ime korisnika nije dostupno
  };

  console.log(user);

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              margin: "auto",
              background: "#1976d2",
            }}
            src="/default-profile.jpg"
          >
            {getInitial(user?.username)}
          </Avatar>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 2, color: "black", fontWeight: "bold" }}
          >
            {user.roleNames.length > 0
              ? user.roleNames.map((roleName) => roleName)
              : "Korisnik nema ulogu"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: grey[300] }} />

        <Grid container spacing={3}>
          <Grid marginLeft={10} item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} /> Ime
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">{user?.firstName}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginLeft={10} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} /> Prezime
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">{user?.lastName}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginLeft={10} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} /> Korisnicko ime
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">{user?.username}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginLeft={10} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EmailIcon sx={{ mr: 1 }} /> Email
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">{user?.email}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginLeft={10} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1, color: "#1976d2" }} /> Aktivan
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">
                  {" "}
                  {formatActiveStatus(user?.active)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginLeft={10} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BlogIcon sx={{ mr: 1 }} /> Ukupno kreiranih blogova
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">
                  {user?.totalCreatedBlogs}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginLeft={10} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BlogIcon sx={{ mr: 1 }} /> Ukupno odobrenih blogova
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">
                  {user?.blogApproveCount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item marginLeft={10} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StarIcon sx={{ mr: 1, color: "#1976d2" }} /> Blogger Score
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1">{user?.bloggerScore}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
