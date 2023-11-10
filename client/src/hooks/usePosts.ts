import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllPostFn } from "../api/postApi";
import { setPosts } from "../redux";
export default function usePosts() {
  // const dispatch = useDispatch();
  return useQuery({
    queryKey: ["getAllPost"],
    queryFn: async () => getAllPostFn(),
    staleTime: Infinity,
    refetchOnWindowFocus: "always",
    // onSuccess: (data) => {
    //   if (data?.success && data.posts!.length > 0) {
    //     dispatch(setPosts(data.posts));
    //   }
    // },
  });
}
