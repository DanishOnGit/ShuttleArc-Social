import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutButtonClicked } from "../authentication/authenticationSlice";
import { colors } from "../../database";
// import { colors } from "../../database";

export const NavBar = () => {
  const dispatch = useDispatch();
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

      <Input
        width="40%"
        placeholder="Search Users"
        size="sm"
        focusBorderColor={colors.orange[500]}
      />

      <Menu>
        <MenuButton as={Button} focusBorderColor={colors.orange[500]} rightIcon={<ChevronDownIcon />}>
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
      {/* <HStack spacing="24px">
        <Box>Likes</Box>
        <Box>Posts</Box>
        <Box>Profile</Box>
      </HStack> */}
    </Flex>
  );
};
