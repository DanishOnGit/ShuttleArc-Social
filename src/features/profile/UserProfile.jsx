import { Grid, GridItem } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { List, ListItem } from "@chakra-ui/react";
import { ComposePost } from "../posts/ComposePost";
import { Spinner } from "@chakra-ui/react";
import { ProfileHeader } from "./ProfileHeader";
import { resetProfile, useProfile, viewingUserProfile } from "./profileSlice";
import { FeedCard } from "../feed/FeedCard";
import { useParams } from "react-router";

export const UserProfile = () => {
  const { status, name, bio, followers, following, posts } = useProfile();
  const dispatch = useDispatch();
  const { userName } = useParams();

  useEffect(() => {
    console.log("useffect in veiwing profile...");
    dispatch(viewingUserProfile({ userName }));
    return dispatch(resetProfile());
  }, [dispatch, userName]);

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
        >
          <GridItem
            position={{ md: "sticky", base: "absolute" }}
            display={{ md: "flex", base: "none" }}
            flexDirection="column"
            padding="1rem"
            colSpan={1}
            textAlign="left"
          >
            <List
              spacing="2rem"
              listStyleType="none"
              fontWeight="extrabold"
              fontSize="xl"
              mt="4rem"
              cursor="pointer"
            >
              <ListItem
                _hover={{ bgColor: "grey.400" }}
                p="0.5rem"
                borderRadius="3rem"
              >
                <i class="fas fa-home"></i> Home
              </ListItem>
              <ListItem
                _hover={{ bgColor: "grey.400" }}
                p="0.5rem"
                borderRadius="3rem"
              >
                <i class="fas fa-user-friends"></i> Followers
              </ListItem>
              <ListItem
                _hover={{ bgColor: "grey.400" }}
                p="0.5rem"
                borderRadius="3rem"
              >
                <i class="fas fa-user-tag"></i> Following
              </ListItem>
              <ListItem
                _hover={{ bgColor: "grey.400" }}
                p="0.5rem"
                borderRadius="3rem"
              >
                <i class="fas fa-bell"></i> Notifications
              </ListItem>
              <ListItem>
                <ComposePost />
              </ListItem>
            </List>
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
                postCount={posts.length}
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
