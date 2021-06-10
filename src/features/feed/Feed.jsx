import { Box, Text } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FeedCard } from "./FeedCard";
import { createPost, getAllPosts } from "../posts/postSlice";
import {
  logOutButtonClicked,
  useAuth,
} from "../authentication/authenticationSlice";
import { Grid } from "@chakra-ui/layout";
import { GridItem } from "@chakra-ui/layout";
import { colors } from "../../database";
import { SimpleGrid } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ComposePost } from "../posts/ComposePost";

export const Feed = () => {
  const { posts, status } = useSelector((state) => state.posts);
  const { token, userName } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (status === "idle") {
    //   dispatch(getAllPosts());
    // }
    if (token) {
      dispatch(getAllPosts());
    }
  }, [token]);

  return (
    <>
      <Text>{userName}</Text>
      <Grid
        margin="1rem"
        height="500px"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1} bg={colors.orange[500]}>
          <ComposePost />
          <Button onClick={() => dispatch(logOutButtonClicked())}>
            Logout
          </Button>
        </GridItem>
        {posts.length !== 0 &&
          posts.map((post) => (
            <GridItem colSpan={4}>
              <FeedCard post={post} />
            </GridItem>
          ))}
      </Grid>
    </>
  );
};
