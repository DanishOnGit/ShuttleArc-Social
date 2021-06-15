import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/layout";
import { useDispatch } from "react-redux";
import { colors, fonts } from "../../database";
import { likeButtonClicked } from "../posts/postSlice";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  followUnfollowButtonClickedOnFeedCard,
  useAuth,
} from "../authentication/authenticationSlice";
import { Link } from "react-router-dom";
import { checkIfAlreadyFollowing } from "../utils/checkIfAlreadyFollowing";

export const getMonthAndDay = (date) => {
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  date = new Date(date);
  const day = date.getDay();
  const month = date.getMonth();

  return `${monthList[month - 1]} ${day}`;
};

export const FeedCard = ({ post }) => {

  const { userName,following } = useAuth();
  const dispatch = useDispatch();
 
  return (
    <Box>
      <Box boxShadow='0px 0px 10px 4px rgb(0 0 0 / 5%)'mt="1.5rem" p="0.75rem">
        <Flex>
        <Link to={`/${post.userId.userName}/profile`}><Avatar
            name={post.userId.userId.name}
            src="https://bit.ly/broken-link"
          /></Link>
          <Box textAlign="left" p="0rem 1rem">
            <Flex mb="0.5rem" justifyContent="space-between">
              <Flex>
                <Link to={`/${post.userId.userName}/profile`}>
                  <Text
                    
                    fontWeight={fonts.fontweight.bold}
                  >
                    {" "}
                    {post.userId.userId.name}
                  </Text>
                </Link>
                <Text
                  m="0 0.5rem"
                  color={colors.grey[500]}
                  fontWeight={fonts.fontweight.light}
                >
                  {" "}
                  @{post?.userId?.userName}
                </Text>
                <Text
                  color={colors.grey[500]}
                  fontWeight={fonts.fontweight.light}
                >
                  {" "}
                  {getMonthAndDay(post.createdAt)}
                </Text>
              </Flex>
              {post.userId.userName === userName ? (
                <></>
              ) : (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<i class="fas fa-ellipsis-h"></i>}
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem
                      onClick={() =>
                        dispatch(
                          followUnfollowButtonClickedOnFeedCard(post.userId)
                        )
                      }
                      icon={<AddIcon />}
                    >
                      {checkIfAlreadyFollowing(following,post.userId._id)}
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
            <Box>
              <Text mb="0.5rem">{post.content}</Text>
            </Box>
            <IconButton
              onClick={() => dispatch(likeButtonClicked(post._id))}
              color={post.isLikedByUser ? "red" : ""}
              aria-label="Search database"
              icon={<i class="far fa-heart"></i>}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

