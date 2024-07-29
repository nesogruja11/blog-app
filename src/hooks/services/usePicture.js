import { useRequest } from "../../util/useAxios";
import { useMutation, useQueryClient } from "react-query";

export const getPictures = (blogId) => {
  const request = useRequest();
  return request({
    url: `/picture/findByBlog?blogId=${blogId}`,
    method: "get",
  });
};

export const useAddPicture = () => {
  const queryClient = useQueryClient();
  return useMutation(addPicture, {
    onSuccess: () => {
      queryClient.invalidateQueries("pictures");
    },
  });
};

const addPicture = (data) => {
  const request = useRequest();
  return request({ url: "/picture/savePictures", method: "post", data: data });
};
