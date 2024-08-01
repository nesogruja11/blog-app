import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useRequest } from "../../util/useAxios";

export const getRoles = (userId) => {
  const request = useRequest();
  return request({
    url: `/user/role?userId=${userId}`,
    method: "get",
  });
};
export const useUsers = () => {
  return useQuery(["users"], async () => getUsers());
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const usePutUser = () => {
  const queryClient = queryClient();
  return useMutation(putUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useAuthentication = () => {
  return useMutation(authenticate);
};

export const useTopFiveUsers = () => {
  return useQuery(["top-five-users"], async () => getTopFiveUsers());
};

const getTopFiveUsers = async () => {
  const request = useRequest();
  let result = await request({ url: "/user/findTop5", method: "get" });
  return result.data;
};

const getUsers = async () => {
  const request = useRequest();
  let result = await request({ url: "/user/findAll", method: "get" });
  return result.data;
};

const addUser = (data) => {
  const request = useRequest();
  return request({ url: "/user/save", method: "post", data: data });
};

const putUser = (data) => {
  const request = useRequest();
  return request({ url: "/user/update", method: "put", data: data });
};

const authenticate = (data) => {
  const request = useRequest();
  return request({ url: "/user/login", method: "post", data: data });
};
