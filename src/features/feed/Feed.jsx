import { Box, Text } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FeedCard } from "./FeedCard";
import { postButtonClicked, getAllPosts } from "../posts/postSlice";
import { useAuth } from "../authentication/authenticationSlice";
import { Grid } from "@chakra-ui/layout";
import { GridItem } from "@chakra-ui/layout";
import { colors } from "../../database";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ComposePost } from "../posts/ComposePost";
import { ProfileHeader } from "../profile/ProfileHeader";
import { getFollowingStatus } from "../profile/profileSlice";

export const Feed = () => {
  const { posts, status } = useSelector((state) => state.posts);
  const { token, userName,name,bio } = useAuth();
  console.log("From Feed..",name,bio,userName)
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAllPosts());
      dispatch(getFollowingStatus())
    }
  }, [token]);

  return (
    <Grid maxWidth="66vw" margin="auto" templateColumns="1fr 5fr" gap={4}>
      <GridItem
        position="sticky"
        display="flex"
        flexDirection="column"
        padding="1rem"
        colSpan={1}
        bg="gray.200"
      >
        <ComposePost />
      </GridItem>
      <Grid templateColumns="1fr" rowGap="0.5rem">
        <GridItem>
          <ProfileHeader name={name} userName={userName} bio={bio} />
        </GridItem>
        {posts.length !== 0 &&
          posts.map((post) => (
            <GridItem colSpan={4}>
              <FeedCard post={post} />
            </GridItem>
          ))}
      </Grid>
    </Grid>
  );
};
