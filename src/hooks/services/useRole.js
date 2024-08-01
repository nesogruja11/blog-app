import { useQuery } from "react-query";
import { useRequest } from "../../util/useAxios";

export const useRoles = () => {
  return useQuery(["roles"], async () => getRoles());
};

const getRoles = async () => {
  const request = useRequest();
  const result = await request({ url: "/role/findAll", method: "get" });
  return result.data;
};
