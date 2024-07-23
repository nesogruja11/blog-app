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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60, // 5 minutes
      cacheTime: Infinity, // do not delete stale data
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
              <Route path="/add-blog" element={<AddBlog />} />
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/approve-blog" element={<ApproveBlog />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </AuthProvider>
      </ServerProvider>
    </QueryClientProvider>
  );
}

export default App;
