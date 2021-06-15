import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { colors, fonts } from "../../database";
import { useAuth } from "../authentication/authenticationSlice";
import { useDispatch } from "react-redux";
import { followUnfollowButtonClicked, useProfile } from "./profileSlice";
import { usePost } from "../posts/postSlice";
import { useEffect } from "react";

export const ProfileHeader = ({ name, bio, userName,followers,following }) => {
  // const profile = useProfile();
  const { posts } = usePost();
  const {
    userName: currUsersUserName,
    userId,
    // followers,
    // following,
  } = useAuth();
  // console.log("log from profile header", profile);
  console.log("props from ProfileHeader", name, bio, userName,currUsersUserName,userName===currUsersUserName);
  
  const dispatch = useDispatch();

  const checkIfAlreadyFollowing = (currentUsersUserId) => {
    return followers.find((id) => id == currentUsersUserId) ? true : false;
  };
  return (
    <Box textAlign="left" border="1px solid black" p="5rem 0.5rem 2rem">
      <Box>
        <Flex>
          <Avatar size="2xl" name={name} src="https://bit.ly/broken-link" />
          <Box ml="1rem">
            <Flex mb="0.5rem">
              <Box>
                <Text fontWeight={fonts.fontweight.bold}>{name}</Text>
                <Text>@{userName}</Text>
              </Box>
              {userName === currUsersUserName ? (
                <Link to="/edit-Profile">
                  <Button
                    rightIcon={<EditIcon />}
                    m="0 1rem"
                    borderRadius="3rem"
                    variant="outline"
                    color={colors.orange[500]}
                    borderColor={colors.orange[500]}
                    _hover={{ bgColor: colors.orange[400] }}
                  >
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <Button
                  // onClick={() => dispatch(followUnfollowButtonClicked())}
                  rightIcon={!checkIfAlreadyFollowing ? <AddIcon /> : null}
                  m="0 1rem"
                  borderRadius="3rem"
                  variant="outline"
                  color={colors.orange[500]}
                  borderColor={colors.orange[500]}
                  _hover={{ bgColor: colors.orange[400] }}
                >
                  {checkIfAlreadyFollowing(userId) ? "Following" : "Follow"}
                 
                </Button>
              )}
            </Flex>
            <Flex>
              <Text>
                {userName === currUsersUserName
                  ? posts.filter((post) => post.userId._id == userId).length
                  : posts.filter((post) => post.userId._id !== userId)
                      .length}{" "}
                      
                Posts
              </Text>
              <Text m="0 1rem">
                { following.length}{" "}
                Following
              </Text>
              <Text>
                { followers.length}{" "}
                Followers
              </Text>
            </Flex>
            <Flex mt="1rem">
              <Text>{bio}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
