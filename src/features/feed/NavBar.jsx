import {
  Box,
  Flex,
  Input,
  Button,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
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
import logo from "../images/logo-black.svg";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutButtonClicked } from "../authentication/authenticationSlice";
import { colors } from "../../database";
import { useProfile } from "../profile/profileSlice";
import { BasicProfileCard } from "../profile/BasicProfileCard";
import { useRef, useState } from "react";

export const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialFocusRef = useRef(null);
  const dispatch = useDispatch();
  const { allSocialUsers } = useProfile();

  const gettingAllUsers = (text) => {
    if (!searchText) {
      return [];
    } else {
      const result = allSocialUsers.filter((user) => {
        const name = user.userId.name.toLowerCase();
        const searchKeywords = text.toLowerCase();
        return name.includes(searchKeywords);
      });
      return result;
    }
  };

  return (
    <Flex
      zIndex="2"
      p={{base:"1rem 0.5rem",md:"1rem 0"}}
      position="sticky"
      maxWidth={{ md: "67rem", base: "100vw" }}
      margin="auto"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Link to="/home">
          <Image src={logo} boxSize="80px" alt="logo" />
        </Link>
      </Box>

      <Popover isOpen={isOpen} initialFocusRef={initialFocusRef}>
        <PopoverTrigger>
          <Input
            onClick={onOpen}
            ref={initialFocusRef}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            width="40%"
            placeholder="Search Users"
            size="sm"
            borderRadius="3rem"
            focusBorderColor="orange.500"
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton
            onClick={() => {
              setSearchText("");
              onClose();
            }}
          />
          <PopoverHeader>Search Result</PopoverHeader>
          <PopoverBody
            onClick={() => {
              setSearchText("");
              onClose();
            }}
          >
            {gettingAllUsers(searchText).map((user) => (
              <BasicProfileCard user={user} />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Menu>
        <MenuButton
          as={Button}
          focusBorderColor={colors.orange[500]}
          rightIcon={<ChevronDownIcon />}
        >
          Profile
        </MenuButton>
        <MenuList>
          <Link to="/me/following">
            <MenuItem>Following</MenuItem>
          </Link>
          <Link to="/me/followers">
            <MenuItem>Followers</MenuItem>
          </Link>
          <Link to="/me/notifications">
            {" "}
            <MenuItem>Notifications</MenuItem>
          </Link>

          <MenuDivider />
          <MenuItem
            onClick={() => dispatch(logOutButtonClicked())}
            as={Button}
            focusBorderColor="orange.500"
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
