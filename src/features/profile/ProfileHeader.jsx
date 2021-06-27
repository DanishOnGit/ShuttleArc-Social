import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { colors, fonts } from "../../database";
import { useAuth } from "../authentication/authenticationSlice";
import { useDispatch } from "react-redux";
import {
  followUnfollowButtonClickedOnProfileHeader,
  useProfile,
} from "./profileSlice";

export const ProfileHeader = ({
  name,
  bio,
  userName,
  followers,
  following,
  postCount,
}) => {
  const { socialId } = useProfile();
  const { userName: currUsersUserName, userId } = useAuth();
  const dispatch = useDispatch();

  const checkIfAlreadyFollowing = (currentUsersUserId) => {
    return followers.find((id) => id === currentUsersUserId) ? true : false;
  };
  return (
    <Box textAlign="left" p="5rem 0.5rem 2rem">
      <Box>
        <Flex>
          <Avatar size="2xl" name={name} src="https://bit.ly/broken-link"/>
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
                  onClick={() =>
                    dispatch(
                      followUnfollowButtonClickedOnProfileHeader({
                        _id: socialId,
                        loggedInUsersId: userId,
                      })
                    )
                  }
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
            <Flex wrap="wrap">
              <Text>
                <Text as="span" fontWeight="semibold">
                  {postCount}
                </Text>{" "}
                Posts
              </Text>
              <Text m="0 1rem">
                <Text as="span" fontWeight="semibold">
                  {following.length}
                </Text>{" "}
                Following
              </Text>
              <Text>
                <Text as="span" fontWeight="semibold">
                  {followers.length}
                </Text>{" "}
                Followers
              </Text>
            </Flex>
            <Flex mt="1rem">
              <Text>{bio}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Divider />
    </Box>
  );
};
