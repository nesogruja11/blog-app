import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRequest } from "../../util/useAxios";

export const useCountries = () => {
  return useQuery(["countries"], async () => getCountries());
};

const getCountries = async () => {
  const request = useRequest();
  const result = await request({ url: "/country/findAll", method: "get" });
  return result.data;
};
