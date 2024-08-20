import { useRequest } from "../../util/useAxios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useComments = (blogId) => {
  return useQuery(["comments"], async () => getComments(blogId));
};

const getComments = async (blogId) => {
  const request = useRequest();
  const result = await request({
    url: `/comment/findByBlog?blogId=${blogId}`,
    method: "get",
  });
  return result?.data;
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
