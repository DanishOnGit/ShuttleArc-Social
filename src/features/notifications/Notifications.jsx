import { Avatar } from "@chakra-ui/avatar";
import { Text } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { colors, fonts } from "../../database";
import { useNotifications } from "./notificationSlice";

export const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <>
      <Text fontSize="2xl" mb={{base:"1rem",md:"2rem"}}>Notifications</Text>
      <Flex maxWidth={{base:"100vw",md:"66vw"}} m="auto" direction="column">
        {notifications.map((notification) => (
          <>
            <Flex m="0.5rem">
              <Link to={`/${notification?.actionByUserId?.userName}/profile`}>
                <Avatar
                  name={notification?.actionByUserId?.userId?.name}
                  src="https://bit.ly/broken-link"
                />
              </Link>
              <Box textAlign="left" p="0rem 1rem">
                
                  <Link to={`/${notification?.actionByUserId?.userName}/profile`}>
                    <Text fontWeight={fonts.fontweight.bold}>
                      {" "}
                      {notification?.actionByUserId?.userId?.name} {notification?.notificationTitle}
                    </Text>
                  </Link>
                  <Text
                    m="0 0.5rem"
                    color={colors.grey[500]}
                    fontWeight={fonts.fontweight.light}
                  >
                    {" "}
                    @{notification?.actionByUserId?.userName}
                  </Text>
                
              </Box>
            </Flex>
            <Divider />
          </>
        ))}
      </Flex>
    </>
  );
};
