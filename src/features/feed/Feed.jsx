import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { FeedCard } from "./FeedCard";
import { getAllPosts, usePost } from "../posts/postSlice";
import {
  loadUserDetails,
  useAuth,
} from "../authentication/authenticationSlice";
import { Grid } from "@chakra-ui/layout";
import { GridItem } from "@chakra-ui/layout";
import { ComposePost } from "../posts/ComposePost";
import { ProfileHeader } from "../profile/ProfileHeader";

export const Feed = () => {
  const { posts } = usePost();
  const { status, token, userName, name, bio, followers, following } =
    useAuth();
  const loggedInUsersPosts = posts.filter(
    (post) => post.userId.userName === userName
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loadUserDetails(userName));
      dispatch(getAllPosts());
    }
  }, [token, dispatch, userName]);

  return (
    <>
      {status === "loading" ? (
        <Spinner
          size="xl"
          color="orange.500"
          position="absolute"
          top="45vh"
          left="45vw"
        />
      ) : (
        
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
              <ProfileHeader
                name={name}
                userName={userName}
                bio={bio}
                followers={followers}
                following={following}
                postCount={loggedInUsersPosts.length}
              />
            </GridItem>
            {posts.length !== 0 &&
              posts.map((post) => (
                <GridItem key={post._id} colSpan={4}>
                  <FeedCard post={post} />
                </GridItem>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};
