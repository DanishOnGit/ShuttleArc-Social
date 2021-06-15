import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { colors, fonts } from "../../database";
import { likeButtonClicked } from "../posts/postSlice";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  followUnfollowButtonClicked,
  viewingUserProfile,
} from "../profile/profileSlice";
import { useAuth } from "../authentication/authenticationSlice";
import { Link } from "react-router-dom";
import { getMonthAndDay } from "./FeedCard";

export const FeedCard2 = ({ post, name, userName }) => {

  const profile = useSelector((state) => state.profile);
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const checkIfAlreadyFollowing = () => {
    console.log("Running chcekIfAlradyFollowing", profile.following);
    if (profile.following.find((id) => id == post.userId._id)) {
      return "Unfollow";
    }
    return "Follow";
  };
  
  return (
    <Box>
      <Box border="1px solid black" p="0.75rem">
        <Flex>
          <Avatar name={name} src="https://bit.ly/broken-link" />
          <Box textAlign="left" p="0rem 1rem">
            <Flex mb="0.5rem" justifyContent="space-between">
              <Flex>
                <Link to={`/${post.userId.userName}/profile`}>
                  <Text
                    onClick={() => dispatch(viewingUserProfile(post.userId))}
                    fontWeight={fonts.fontweight.bold}
                  >
                    {" "}
                    {name}
                  </Text>
                </Link>
                <Text
                  m="0 0.5rem"
                  color={colors.grey[500]}
                  fontWeight={fonts.fontweight.light}
                >
                  {" "}
                  @{userName}
                </Text>
                <Text
                  color={colors.grey[500]}
                  fontWeight={fonts.fontweight.light}
                >
                  {" "}
                  {getMonthAndDay(post.createdAt)}
                </Text>
              </Flex>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<i class="fas fa-ellipsis-h"></i>}
                  variant="ghost"
                />
                <MenuList>
                  <MenuItem
                    // onClick={() => dispatch(followUnfollowButtonClicked(post.userId))}
                    icon={<AddIcon />}
                  >
                    {checkIfAlreadyFollowing()}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Box>
              <Text mb="0.5rem">{post.content}</Text>
            </Box>
            <IconButton
              onClick={() => dispatch(likeButtonClicked(post._id))}
              color={post.likedBy.find((id) => id == userId) ? "red" : ""}
              aria-label="Search database"
              icon={<i class="far fa-heart"></i>}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
