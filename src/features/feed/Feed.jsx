
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FeedCard } from "./FeedCard";
import {  getAllPosts, usePost } from "../posts/postSlice";
import { loadUserDetails, useAuth } from "../authentication/authenticationSlice";
import { Grid } from "@chakra-ui/layout";
import { GridItem } from "@chakra-ui/layout";
import { colors } from "../../database";
import { Button } from "@chakra-ui/button";
import { ComposePost } from "../posts/ComposePost";
import { ProfileHeader } from "../profile/ProfileHeader";
import { getFollowingStatus } from "../profile/profileSlice";

export const Feed = () => {
  const { posts } = usePost();
  const { token, userName,name,bio,followers,following } = useAuth();
  console.log("From Feed..",name,bio,userName)
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loadUserDetails(userName))
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
          <ProfileHeader name={name} userName={userName} bio={bio} followers={followers} following={following} />
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
