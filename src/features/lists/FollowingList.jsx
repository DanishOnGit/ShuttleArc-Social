import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BasicProfileCard } from "../profile/BasicProfileCard";
import { useDispatch } from "react-redux";
import {
  followingButtonClickedInProfileMenu,
  useAuth,
} from "../authentication/authenticationSlice";

export const FollowingList = () => {

  const { status, following } = useAuth();
  
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(followingButtonClickedInProfileMenu());
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
          <Text fontSize="2xl">People you Follow</Text>
          <Flex maxWidth="66vw" m="auto" direction="column">
            {following.length!==0 &&
              following.map((user) => <BasicProfileCard user={user} />)}
          </Flex>
        </>
      )}
    </>
  );
};
