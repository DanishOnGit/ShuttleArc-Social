import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useEffect, useRef, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { colors } from "../../database";
import axios from "axios";
import { API_URL } from "../utils";
import { Button } from "@chakra-ui/button";

export const ShuttleArcSignup = () => {
  const [userName, setUserName] = useState("");
  const initialRef = useRef(null);
  useEffect(() => initialRef.current.focus(), []);

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
       await axios({
        method: "POST",
        url: `${API_URL}/users-social/shuttlearc-signup`,
        data: {
          userName,
          userId: "60bc960eba143a5a6889c254",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} boxShadow="2xl">
        <Box textAlign="center">
          <Heading>Enter your ShuttleArc credentials</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input isDisabled type="text" value="autofilled" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input isDisabled type="email" value="autofilled" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                ref={initialRef}
                type="text"
                placeholder="username"
                focusBorderColor={colors.orange[500]}
              />
            </FormControl>
            <Button
              onClick={signUpUser}
              borderRadius="3rem"
              bgColor={colors.orange[600]}
              _hover={{ bgColor: colors.orange[700] }}
              width="full"
              mt={4}
              type="submit"
            >
              Log In
            </Button>
          </form>{" "}
        </Box>
      </Box>
    </Flex>
  );
};
