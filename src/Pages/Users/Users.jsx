import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard/UserCard";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { useUsers } from "../../hooks/services/useAuthentication";
import { Grid, Box, Pagination, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useParams } from "react-router-dom";

const Users = () => {
  const { data: allUsersData = [] } = useUsers();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (allUsersData) {
      setUsers(allUsersData);
    }
  }, [allUsersData]);

  return (
    <div>
      <ResponsiveAppBar />
      <Typography
        fontSize={30}
        textAlign={"center"}
        marginTop={5}
        color="#1976d2"
      >
        Informacije o korisnicima
      </Typography>

      <Box sx={{ mt: 7, px: 3, pb: 5 }}>
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
    </div>
  );
};

export default Users;
