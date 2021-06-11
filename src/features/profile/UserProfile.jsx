import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { colors, fonts } from "../../database";

export const UserProfile = () => {
  return (
    <Box textAlign="left" border="1px solid black" p="5rem 0.5rem 2rem">
      <Box>
        <Flex>
          <Avatar
            size="2xl"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Box ml="1rem">
            <Flex mb="0.5rem">
              <Text fontWeight={fonts.fontweight.bold}>danabromov</Text>
              <Link to="/edit-Profile">
                <Button
                  rightIcon={<EditIcon />}
                  m="0 1rem"
                  borderRadius="3rem"
                  variant="outline"
                  borderColor={colors.orange[500]}
                  _hover={{ bgColor: colors.orange[500] }}
                >
                  Edit Profile
                </Button>
              </Link>
            </Flex>
            <Flex>
              <Text>12 Posts</Text>
              <Text m="0 1rem">23 Following</Text>
              <Text>25 Followers</Text>
            </Flex>
            <Flex mt="1rem">
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                minima pariatur voluptatem possimus obcaecati soluta consectetur
                in natus odio nobis facere perspiciatis nihil, fugiat
                reprehenderit dicta corrupti exercitationem ab ullam?
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
