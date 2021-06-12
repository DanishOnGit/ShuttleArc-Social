import { Box, Flex, Text, Grid, GridItem } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useAuth } from "../authentication/authenticationSlice";
import { ProfileHeader } from "./ProfileHeader";
import { useProfile, viewingUserProfile } from "./profileSlice";
import { FeedCard2 } from "../feed/FeedCard2";

export const UserProfile = () => {
  const { name, userName, bio, posts, followers } = useProfile();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewingUserProfile());
  }, []);

  return (
    <Grid templateColumns="1fr" rowGap="0.5rem">
      <GridItem>
        <ProfileHeader name={name} userName={userName} bio={bio} />{" "}
      </GridItem>
      {posts.length !== 0 &&
        posts.map((post) => (
          <GridItem colSpan={4}>
            <FeedCard2 post={post} name={name} userName={userName} />
          </GridItem>
        ))}
    </Grid>
  );
};
