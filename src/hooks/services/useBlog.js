import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  Query,
} from "react-query";
import axios from "axios";
import { DEFAULT_SERVER } from "../../util/const-util";
import { useRequest } from "../../util/useAxios";

const defaultServer = DEFAULT_SERVER;
const req = axios.create({ baseURL: defaultServer });

export const useBlogs = () => {
  return useQuery(["blogs"], async () => getBlogs());
};

export const useUnapprovedBlogs = () => {
  return useQuery(["unapproved-blogs"], async () => getUnapprovedBlogs());
};
export const useFavouriteBlogs = () => {
  return useQuery(["favourite-blogs"], async () => getFavouriteBlogs());
};

export const useApproveBlog = () => {
  const queryClient = new QueryClient();
  return useMutation(approveBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("approved-blogs");
    },
  });
};

export const useAddFavouriteBlog = () => {
  const queryClient = new QueryClient();
  return useMutation(favouriteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("favourite-blog");
    },
  });
};

export const useTopFiveBlogs = () => {
  return useQuery(["top-five-blogs"], async () => getTopFiveBlogs());
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation(addBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });
};

/*export const useApprovedBlogs = () => {
  return useQuery(["approved-blogs"], async () => getApprovedBlogs());
};*/

/*const getApprovedBlogs = async () => {
  const result = await req({ url: "/blog/approve", method: "get" });
  return result.data;
};*/

const getUnapprovedBlogs = async () => {
  const request = useRequest();
  const result = await request({
    url: "/blog/allUnapprovedBlogs",
    method: "get",
  });
  return result.data;
};

export const getFavouriteBlogs = async () => {
  const request = useRequest();
  const result = await request({
    url: "/blog/allFavouritesBlogs",
    method: "get",
  });
  return result.data;
};

const approveBlog = (id) => {
  const request = useRequest();
  return request({ url: `/blog/approve?blogId=${id}`, method: "get" });
};

export const getBlog = (id) => {
  const request = useRequest();
  return request({ url: `/blog/findById?blogId=${id}`, method: "get" });
};

const favouriteBlog = (id) => {
  const request = useRequest();
  return request({
    url: `/blog/saveFavouriteBlog?blogId=${id}`,
    method: "get",
  });
};

const getTopFiveBlogs = async () => {
  const request = useRequest();
  const result = await request({
    url: "/blog/findTop5",
    method: "get",
  });
  return result.data;
};

const addBlog = (data) => {
  const request = useRequest();
  return request({ url: "/blog/save", method: "post", data: data });
};

const getBlogs = async () => {
  const request = useRequest();
  const result = await request({ url: "/blog/findAll", method: "get" });
  return result.data;
};
