import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard/UserCard";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { useUsers } from "../../hooks/services/useAuthentication";
import {
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Pagination,
} from "@mui/material";
import { useRoles } from "../../hooks/services/useRole";
import { useAddUser } from "../../hooks/services/useAuthentication";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Users = () => {
  const { data: allUsersData = [] } = useUsers();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const { data: rolesData } = useRoles();

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      role: "",
      status: "",
    },
  });

  const formData = watch();

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "Ime je obavezno";
    if (!formData.lastName) newErrors.lastName = "Prezime je obavezno";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Neispravna email adresa";
    if (!formData.username) newErrors.username = "Korisničko ime je obavezno";
    if (formData.username.length < 6)
      newErrors.username = "Korisničko ime mora imati najmanje 6 karaktera";
    if (
      !formData.password ||
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    )
      newErrors.password =
        "Lozinka mora imati najmanje 6 karaktera, uključujući broj, veliko i malo slovo";
    if (!formData.role) newErrors.role = "Uloga je obavezna";
    if (!formData.status) newErrors.status = "Status je obavezan";

    return newErrors;
  };

  const onSubmit = (data) => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const addData = {
        ...data,
        roleNames: [data.role],
        status: data.status === "active" ? true : false,
      };

      mutateAdd(addData, {
        onSuccess: () => {
          toast.success("Uspjesno ste dodali korisnika!");
          handleClose();
        },
        onError: () =>
          toast.error("Došlo je do greške prilikom dodavanja korisnika!"),
      });
    } else {
      setErrors(newErrors);
    }
  };

  const { mutate: mutateAdd } = useAddUser();

  useEffect(() => {
    if (allUsersData) {
      setUsers(allUsersData);
    }
  }, [allUsersData]);

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          mt: 5,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={30}
          color="#1976d2"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Informacije o korisnicima
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#1976d2" }}
          onClick={handleClickOpen}
        >
          Dodaj korisnika
        </Button>
      </Box>

      <Box sx={{ mt: 3, px: 3, pb: 5 }}>
        {currentUsers.length > 0 ? (
          <>
            <Grid container spacing={3} justifyContent="center">
              {currentUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={user.userId}>
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#1976d2",
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "white",
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <div>No users available</div>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle marginTop={3} color="#1976d2">
          Dodaj novog korisnika
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              name="firstName"
              label="Ime"
              type="text"
              fullWidth
              variant="outlined"
              {...register("firstName", { required: true })}
              error={!!errors.firstName}
              helperText={errors.firstName}
              autoComplete="given-name"
            />
            <TextField
              margin="dense"
              id="lastName"
              name="lastName"
              label="Prezime"
              type="text"
              fullWidth
              variant="outlined"
              {...register("lastName", { required: true })}
              error={!!errors.lastName}
              helperText={errors.lastName}
              autoComplete="family-name"
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="email"
            />
            <TextField
              margin="dense"
              id="username"
              name="username"
              label="Korisničko ime"
              type="text"
              fullWidth
              variant="outlined"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={errors.username}
              autoComplete="username"
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Lozinka"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password}
              autoComplete="current-password"
            />
            <TextField
              select
              margin="dense"
              id="role"
              name="role"
              label="Uloga"
              fullWidth
              variant="outlined"
              value={formData.role || ""}
              onChange={(e) => setValue("role", e.target.value)}
              error={!!errors.role}
              helperText={errors.role}
            >
              {rolesData?.map((role) => (
                <MenuItem value={role.previewName} key={`role-${role.roleId}`}>
                  {role.previewName}
                </MenuItem>
              ))}
            </TextField>
            <FormControl component="fieldset" margin="dense">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                aria-label="status"
                name="status"
                value={formData.status}
                onChange={(e) => setValue("status", e.target.value)}
              >
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Aktivan"
                />
                <FormControlLabel
                  value="inactive"
                  control={<Radio />}
                  label="Neaktivan"
                />
              </RadioGroup>
              {errors.status && (
                <FormHelperText error>{errors.status}</FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Otkaži</Button>
            <Button type="submit">Sačuvaj</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Users;
