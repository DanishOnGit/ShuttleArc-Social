import { Avatar } from "@chakra-ui/avatar";
import { Text } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { colors, fonts } from "../../database";

export const BasicProfileCard = ({ user }) => {
 
  return (
    <>
      <Flex m="0.5rem">
        <Link to={`/${user?.userName}/profile`}>
          <Avatar name={user?.userId?.name} src="https://bit.ly/broken-link" />
        </Link>
        <Box textAlign="left" p="0rem 1rem">
          <Flex>
            <Link to={`/${user?.userName}/profile`}>
              <Text fontWeight={fonts.fontweight.bold}>
                {" "}
                {user?.userId?.name}
              </Text>
            </Link>
            <Text
              m="0 0.5rem"
              color={colors.grey[500]}
              fontWeight={fonts.fontweight.light}
            >
              {" "}
              @{user?.userName}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Divider />
    </>
  );
};
