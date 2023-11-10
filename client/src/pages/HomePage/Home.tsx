import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { mediaState } from "../../redux";
import CreatePostWidget from "../../components/CreatePostWidget/CreatePostWidget";
import PostsWidget from "../../components/PostsWidget/PostsWidget";
import AdvertWidget from "../../components/AdvertWidget/AdvertWidget";
import ListFriend from "../../components/ListFriend/ListFriend";
const Home = () => {
  const isNonResponsive = useMediaQuery("(min-width: 1000px)");
  const userLogged = useSelector((state: mediaState) => state.user);

  return (
    <React.Fragment>
      <Navbar />
      <Box
        width={"100%"}
        padding={"22px 4%"}
        display={isNonResponsive ? "flex" : "block"}
        gap={"10px"}
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonResponsive ? "25%" : undefined}></Box>
        <Box
          flexBasis={isNonResponsive ? "42%" : undefined}
          mt={isNonResponsive ? undefined : "30px"}
        >
          <CreatePostWidget
            picturePath={userLogged?.picturePath as string}
          ></CreatePostWidget>
          <PostsWidget
            userId={userLogged?._id as string}
            isProfilePage={false}
          ></PostsWidget>
        </Box>
        {isNonResponsive && (
          <Box
            flexBasis={isNonResponsive ? "25%" : undefined}
            position={"sticky"}
          >
            <AdvertWidget></AdvertWidget>
            <Box margin={"35px 0"}></Box>
            <ListFriend userId={userLogged?._id as string}></ListFriend>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Home;
