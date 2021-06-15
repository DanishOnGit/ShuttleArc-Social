import { Grid, GridItem } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProfileHeader } from "./ProfileHeader";
import { resetProfile, useProfile, viewingUserProfile } from "./profileSlice";
import { FeedCard } from "../feed/FeedCard";
import { usePost } from "../posts/postSlice";
import { loadUserDetails } from "../authentication/authenticationSlice";

export const UserProfile = () => {
  const { name, userName, bio, followers, following } = useProfile();
  const { posts } = usePost();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewingUserProfile());
    return dispatch(resetProfile());
  }, []);

  return (
    <Grid maxWidth="66vw" margin="auto" templateColumns="1fr" rowGap="0.5rem">
      <GridItem>
        <ProfileHeader
          name={name}
          userName={userName}
          bio={bio}
          followers={followers}
          following={following}
        />{" "}
      </GridItem>
      {posts.length !== 0 &&
        posts
          .filter((post) => post.userId.userName === userName)
          .map((post) => (
            <GridItem colSpan={4}>
              <FeedCard post={post} />
            </GridItem>
          ))}
    </Grid>
  );
};
