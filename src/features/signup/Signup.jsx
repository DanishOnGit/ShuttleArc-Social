import { Button } from "@chakra-ui/button";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { colors } from "../../database";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signUpButtonClicked,
  useAuth,
} from "../authentication/authenticationSlice";
import { useToast } from "@chakra-ui/react";

export const Signup = () => {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { status } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} boxShadow="2xl">
        <Box textAlign="center">
          <Heading>Signup</Heading>
        </Box>
        <Box>
          <Text mt="0.5rem">Have a ShuttleArc account?</Text>
          <Link to="/shuttlearc-login">
            <Button
              borderRadius="3rem"
              bgColor={colors.orange[600]}
              _hover={{ bgColor: colors.orange[700] }}
              width="full"
              mt={4}
            >
              Sign up with ShuttleArc
            </Button>
          </Link>
        </Box>
        <Text m="0.5rem" color={colors.grey[700]}>
          --------OR--------
        </Text>
        <Box my={4} textAlign="left">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Danny"
              focusBorderColor={colors.orange[500]}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="danny@gmail.com"
              focusBorderColor={colors.orange[500]}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="danjacobs"
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
            isDisabled={!name || !userName || !userEmail || !userPassword}
            isLoading={status === "loading"}
            onClick={async () => {
              const result = await dispatch(
                signUpButtonClicked({ name, userName, userEmail, userPassword })
              );

              console.log("Signup response", result);
              toast({
                title: `${
                  result.payload.success
                    ? "Signup successfull"
                    : "Please try again"
                }`,
                description: `${result.payload.message}`,
                status: `${result.payload.status}`,
                duration: 2000,
                isClosable: true,
              });
              if (result.payload.success) {
                setName("");
                setUserEmail("");
                setUserName("");
                setUserPassword("");
                navigate("/");
              }
            }}
            borderRadius="3rem"
            bgColor={colors.orange[600]}
            _hover={{ bgColor: colors.orange[700] }}
            width="full"
            mt={4}
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
