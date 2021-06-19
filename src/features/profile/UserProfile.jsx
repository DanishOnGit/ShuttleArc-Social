import { Grid, GridItem } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { ProfileHeader } from "./ProfileHeader";
import { resetProfile, useProfile, viewingUserProfile } from "./profileSlice";
import { FeedCard } from "../feed/FeedCard";
import { useParams } from "react-router";

export const UserProfile = () => {
  const { status,name, bio, followers, following, posts } = useProfile();
  const dispatch = useDispatch();
  const { userName } = useParams();

  useEffect(() => {
    console.log("useffect in veiwing profile...")
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
          maxWidth="66vw"
          margin="auto"
          templateColumns="1fr"
          rowGap="0.5rem"
        >
          <GridItem>
            <ProfileHeader
              name={name}
              userName={userName}
              bio={bio}
              followers={followers}
              following={following}
              postCount={posts.length}
            />{" "}
          </GridItem>
          {posts.length !== 0 &&
            posts.map((post) => (
              <GridItem colSpan={4} key={post._id}>
                <FeedCard post={post} />
              </GridItem>
            ))}
        </Grid>
      )}
    </>
  );
};
