import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BlogIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRoles } from "../../hooks/services/useRole";
import {
  useDeleteUser,
  usePutUser,
} from "../../hooks/services/useAuthentication";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";

const UserCard = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { data: rolesData } = useRoles();
  const { mutate: mutatePut } = usePutUser();
  const { mutate: mutateDelete } = useDeleteUser();
  const { register, handleSubmit, setValue, getValues, reset, watch } =
    useForm();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formatActiveStatus = (isActive) => (isActive ? "Aktivan" : "Neaktivan");

  const getInitial = (username) => {
    if (username) {
      return username.charAt(0).toUpperCase();
    }
    return "?"; // Ako ime korisnika nije dostupno
  };

  useEffect(() => {
    if (user) {
      setValue("userId", user.userId);
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("username", user.username || "");
      setValue("email", user.email || "");
      setValue("password", "");
      setValue("role", user.roleNames[0] || "");
      setValue("active", user.active ? "true" : "false");
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    if (!data.userId) {
      toast.error("Neispravan ID korisnika");
      return;
    }

    const updatedData = {
      ...data,
      roleNames: [data.role],
    };

    mutatePut(updatedData, {
      onSuccess: () => {
        toast.success("Korisnik je ažuriran");
        handleClose();
      },
      onError: () => {
        toast.error("Došlo je do greške prilikom ažuriranja korisnika!");
      },
    });
  };

  const onDelete = () => {
    if (!user?.userId) {
      toast.error("Neispravan ID korisnika");
      return;
    }
    if (!user?.active) {
      toast.error("Ne možete obrisati neaktivnog korisnika");
      return;
    }
    mutateDelete(user.userId, {
      onSuccess: () => {
        toast.success("Korisnik je obrisan");
      },
      onError: () => {
        toast.error("Došlo je do greške prilikom brisanja korisnika!");
      },
    });
  };

  return (
    <>
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
                ? user.roleNames.map((roleName) => roleName).join(", ")
                : "Korisnik nema ulogu"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: grey[300] }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
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

            <Grid item xs={12}>
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

            <Grid item xs={12}>
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
                    <PersonIcon sx={{ mr: 1 }} /> Korisničko ime
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">{user?.username}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
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

            <Grid item xs={12}>
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
                    {user?.active ? (
                      <CheckCircleIcon sx={{ mr: 1, color: "#1976d2" }} />
                    ) : (
                      <CancelIcon sx={{ mr: 1, color: "red" }} />
                    )}
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    {formatActiveStatus(user?.active)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
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

            <Grid item xs={12}>
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

            <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="update"
                      onClick={handleClickOpen}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={onDelete}
                      disabled={!user?.active}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Modal za ažuriranje korisnika */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="#1976d2">Ažuriraj podatke o korisniku</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              name="firstName"
              label="Ime"
              type="text"
              fullWidth
              variant="outlined"
              {...register("firstName")}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Prezime"
              type="text"
              fullWidth
              variant="outlined"
              {...register("lastName")}
            />
            <TextField
              margin="dense"
              name="username"
              label="Korisničko ime"
              type="text"
              fullWidth
              variant="outlined"
              {...register("username")}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              autoComplete="email"
              {...register("email")}
            />
            <TextField
              margin="dense"
              name="password"
              label="Lozinka"
              type="password"
              fullWidth
              variant="outlined"
              autoComplete="current-password"
              {...register("password")}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Uloga</InputLabel>
              <Select
                name="role"
                value={watch("role") || ""}
                label="Uloga"
                {...register("role")}
              >
                {rolesData?.map((role) => (
                  <MenuItem
                    value={role.previewName}
                    key={`role-${role.roleId}`}
                  >
                    {role.previewName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl component="fieldset" margin="dense">
              <RadioGroup
                name="active"
                value={watch("active") || "false"}
                row
                onChange={(event) => setValue("active", event.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Aktivan"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Neaktivan"
                />
              </RadioGroup>
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose}>Otkaži</Button>
              <Button type="submit">Sačuvaj</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserCard;
