import React from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/contexts/AuthProvider";
import { ServerProvider } from "./hooks/contexts/ServerProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AddBlog from "./Pages/AddBlog/AddBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApproveBlog from "./Pages/ApproveBlog/ApproveBlog";
import FavouriteBlogs from "./Pages/FavouriteBlogs/FavouriteBlogs";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Users from "./Pages/Users/Users";
import PrivateRoute from "./components/PrivateRoute.js/PrivateRoute";
import { UserRoles } from "./hooks/contexts/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ServerProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/blog-details/:blogId" element={<BlogDetails />} />
              <Route
                path="/add-blog"
                element={
                  <PrivateRoute
                    allowedRoles={[UserRoles.USER, UserRoles.ADMIN]}
                  >
                    <AddBlog />
                  </PrivateRoute>
                }
              />
              <Route
                path="/favourite-blogs"
                element={
                  <PrivateRoute
                    allowedRoles={[UserRoles.USER, UserRoles.ADMIN]}
                  >
                    <FavouriteBlogs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/approve-blog"
                element={
                  <PrivateRoute allowedRoles={[UserRoles.ADMIN]}>
                    <ApproveBlog />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute allowedRoles={[UserRoles.ADMIN]}>
                    <Users />
                  </PrivateRoute>
                }
              />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </AuthProvider>
      </ServerProvider>
    </QueryClientProvider>
  );
}

export default App;
