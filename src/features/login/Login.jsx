import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginWithCredentials,
  useAuth,
} from "../authentication/authenticationSlice";
import { useEffect, useRef, useState } from "react";
import { colors } from "../../database";
import { useToast } from "@chakra-ui/react";

export const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const initialRef = useRef();
  const { status } = useAuth();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => initialRef.current.focus(), []);
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} boxShadow="2xl">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
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
            isLoading={status === "loading"}
            onClick={async () => {
              const result = await dispatch(
                loginWithCredentials({ userEmail, userPassword })
              );

              toast({
                title: `${
                  result.payload.success ? "Logged In" : "Please try again"
                }`,
                description: `${result.payload.message}`,
                status: `${result.payload.status}`,
                duration: 2000,
                isClosable: true,
              });
            }}
            borderRadius="3rem"
            bgColor={colors.orange[600]}
            _hover={{ bgColor: colors.orange[700] }}
            width="full"
            mt={4}
          >
            Log In
          </Button>
        </Box>

        <Text>
          Don't have an account?{" "}
          <Text color={colors.orange[700]} as="span">
            <Link to="/signup">Signup</Link>
          </Text>
        </Text>
        <Box>
          <Text>-----------OR-----------</Text>
        <Button
            isLoading={status === "loading"}
            onClick={async () => {
              setUserEmail("danny@gmail.com");
              setUserPassword("Danny@123");
              const result = await dispatch(
                loginWithCredentials({ userEmail:"danny@gmail.com", userPassword:"Danny@123" })
              );

              toast({
                title: `${
                  result.payload.success ? "Logged In" : "Please try again"
                }`,
                description: `${result.payload.message}`,
                status: `${result.payload.status}`,
                duration: 2000,
                isClosable: true,
              });
            }}
            borderRadius="3rem"
            border="1px solid red"
            _hover={{ bgColor: colors.orange[700] }}
            width="full"
            mt={4}
          >
            Use Test Credentials
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
