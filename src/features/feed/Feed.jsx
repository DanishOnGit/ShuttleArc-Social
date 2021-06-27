import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Spinner,Box } from "@chakra-ui/react";
import { FeedCard } from "./FeedCard";
import { Link } from "react-router-dom";
import { List, ListItem } from "@chakra-ui/react";
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
        <Grid
          maxWidth={{ md: "67rem", base: "100vw" }}
          margin="auto"
          templateColumns={{ md: "1fr 5fr", base: "1fr" }}
          gap={4}
          height="100vh"
        >
          <GridItem
            position={{ md: "sticky", base: "absolute" }}
            flexDirection="column"
            padding="1rem"
            colSpan={1}
            textAlign="left"
          >
            <List
              display={{ base: "none", md: "block" }}
              spacing={6}
              listStyleType="none"
              fontWeight="extrabold"
              fontSize="xl"
              mt="4rem"
              cursor="pointer"
            >
              <Link to="/home">
                <ListItem
                  _hover={{ bgColor: "orange.400" }}
                  p="0.5rem"
                  borderRadius="3rem"
                  m="0.5rem 0"
                >
                  <i class="fas fa-home"></i> Home
                </ListItem>
              </Link>
              <Link to="/me/followers">
                {" "}
                <ListItem
                  _hover={{ bgColor: "orange.400" }}
                  p="0.5rem"
                  borderRadius="3rem"
                  m="0.5rem 0"
                >
                  <i class="fas fa-user-friends"></i> Followers
                </ListItem>
              </Link>
              <Link to="/me/following">
                <ListItem
                  _hover={{ bgColor: "orange.400" }}
                  p="0.5rem"
                  borderRadius="3rem"
                  m="0.5rem 0"
                >
                  <i class="fas fa-user-tag"></i> Following
                </ListItem>
              </Link>
              <Link to="/me/notifications">
                <ListItem
                  _hover={{ bgColor: "orange.400" }}
                  p="0.5rem"
                  borderRadius="3rem"
                >
                  <i class="fas fa-bell"></i> Notifications
                </ListItem>
              </Link>
             
            </List>
            <Box
            mt={{base:"0",md:"1.5rem"}}
              position={{ base: "fixed", md: "static" }}
              display={{ md: "flex", base: "block" }}
              bottom={{ base: "1rem" }}
              right={{ base: "1rem" }}
            >
              <ComposePost />
            </Box>
          </GridItem>
          <Grid
            templateColumns="1fr"
            rowGap="0.5rem"
            paddingLeft="0.35rem"
            borderLeft="1px solid lightGrey"
          >
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
