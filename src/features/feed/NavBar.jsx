import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutButtonClicked } from "../authentication/authenticationSlice";
import { colors } from "../../database";
import { getAllSocialUsers, useProfile } from "../profile/profileSlice";
import { useRef, useState } from "react";

export const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const initialFocusRef = useRef(null);
  const dispatch = useDispatch();
  const { allSocialUsers } = useProfile();

  // const gettingAllUsers = () => {
  //   let clearId;
  //   return function getUsers() {
  //     clearId = setTimeout(() => {
  //       dispatch(getAllSocialUsers());
  //     }, 300);
  //     return function () {
  //       clearTimeout(clearId);
  //     };
  //   };
  // };

  const gettingAllUsers = (text) => {
    const result = allSocialUsers.filter((user) => user.userId.name.includes(text));
    return result;
  };
  console.log("search result ", gettingAllUsers(searchText));

  return (
    <Flex
      p="1rem 0"
      position="sticky"
      maxWidth="66vw"
      margin="auto"
      justifyContent="space-between"
    >
      <Box>
        <Link to="/home">
          <Text fontWeight="bold">LOGO</Text>
        </Link>
      </Box>

      <Popover initialFocusRef={initialFocusRef}>
        <PopoverTrigger>
          <Input
            ref={initialFocusRef}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            width="40%"
            placeholder="Search Users"
            size="sm"
            focusBorderColor={colors.orange[500]}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            {gettingAllUsers(searchText).map((user) => (
              <Box>
                {user.userId.name} {user.userName}
              </Box>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>

      {/* <Input
      onClick=
        onChange={() => gettingAllUsers()()}
        width="40%"
        placeholder="Search Users"
        size="sm"
        focusBorderColor={colors.orange[500]}
      /> */}

      <Menu>
        <MenuButton
          as={Button}
          focusBorderColor={colors.orange[500]}
          rightIcon={<ChevronDownIcon />}
        >
          Profile
        </MenuButton>
        <MenuList>
          <MenuItem>Posts</MenuItem>
          <MenuItem>Likes</MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => dispatch(logOutButtonClicked())}
            as={Button}
            focusBorderColor={colors.orange[500]}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
