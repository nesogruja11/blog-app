import { useRequest } from "../../util/useAxios";
import { useMutation, useQueryClient } from "react-query";

export const getComments = (blogId) => {
  const request = useRequest();
  return request({
    url: `/comment/findByBlog?blogId=${blogId}`,
    method: "get",
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
};

const addComment = (data) => {
  const request = useRequest();
  return request({ url: "/comment/save", method: "post", data: data });
};
