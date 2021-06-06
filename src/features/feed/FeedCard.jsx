import { Avatar } from "@chakra-ui/avatar";
import { Text } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/layout";
import { colors, fonts } from "../../database";

export const FeedCard = () => {
  return (
    <Box>
      <Box border="1px solid black" p="0.75rem">
        <Flex>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Box textAlign="left" p="0rem 1rem">
            <Flex mb="0.5rem">
              <Text  fontWeight={fonts.fontweight.bold}> Dan Abromov</Text>
              <Text
                m="0 0.5rem"
                color={colors.grey[500]}
                fontWeight={fonts.fontweight.light}
              >
                {" "}
                @danabromov
              </Text>
              <Text
                color={colors.grey[500]}
                fontWeight={fonts.fontweight.light}
              >
                {" "}
                June 4
              </Text>
            </Flex>
            <Box>
              <Text mb="0.5rem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                laboriosam nemo quaerat soluta voluptatibus fugiat? Recusandae
                deserunt minima, nisi numquam architecto esse quidem autem
                pariatur. Nam illum quam aspernatur dolor
              </Text>
            </Box>

            <i class="far fa-heart"></i>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
