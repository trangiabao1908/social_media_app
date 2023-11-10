import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PostWidget from "../PostWidget/PostWidget";
import usePosts from "../../hooks/usePosts";
// define type Props
type Props = {
  userId: string;
  isProfilePage: boolean;
};

const PostsWidget = (props: Props) => {
  const { userId, isProfilePage } = props;
  const posts = useSelector((state: RootState) => state.posts);
  const { isLoading, isFetching } = usePosts();
  return (
    <React.Fragment>
      {posts &&
        posts.map((post) => (
          <PostWidget
            key={post._id}
            user={post.user}
            _id={post._id}
            description={post.description}
            location={post.location}
            likes={post.likes}
            comments={post.comments}
            picturePath={post.picturePath}
            isFetching={isFetching}
            isLoading={isLoading}
          ></PostWidget>
        ))}
    </React.Fragment>
  );
};

export default PostsWidget;
