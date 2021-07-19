import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BasicProfileCard } from "../profile/BasicProfileCard";
import { useDispatch } from "react-redux";
import {
  followersButtonClickedInProfileMenu,
  useAuth,
} from "../authentication/authenticationSlice";

export const FollowersList = () => {
  const { status, followers } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(followersButtonClickedInProfileMenu());
  }, [dispatch]);
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
        <>
          <Text fontSize="2xl">Your Followers</Text>
          <Flex maxWidth="66vw" m="auto" direction="column">
            {followers.map((user) => (
              <BasicProfileCard user={user} />
            ))}
          </Flex>
        </>
      )}
    </>
  );
};