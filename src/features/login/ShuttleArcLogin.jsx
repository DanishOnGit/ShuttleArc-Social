import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useNavigate } from "react-router";
import { API_URL } from "../utils";
import { useEffect, useRef, useState } from "react";
import { colors } from "../../database";

export const ShuttleArcLogin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const initialRef = useRef(null);

  useEffect(()=>initialRef.current.focus()
  ,[])

  const shuttleArcLogin = async (e) => {
    try {
      e.preventDefault();
      console.log("logging...")
      const response = await axios({
        method: "POST",
        url: `${API_URL}/users-social/checkUserShuttleArcCredentials`,
        headers: {
          email: userEmail,
          password: userPassword,
        },
      });
      if (response.status === 200) {
        console.log("Accepted")
        navigate("/shuttlearc-signup");
      }
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
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
              ref={initialRef}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                placeholder="test@test.com"
                focusBorderColor={colors.orange[500]}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                type="password"
                placeholder="*******"
                focusBorderColor={colors.orange[500]}
              />
            </FormControl>
            <Button
              onClick={shuttleArcLogin}
              borderRadius="3rem"
              bgColor={colors.orange[600]}
              _hover={{ bgColor: colors.orange[700] }}
              width="full"
              mt={4}
              type="submit"
            >
              Log In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
