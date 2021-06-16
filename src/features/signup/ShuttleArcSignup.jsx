import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useEffect, useRef, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { colors } from "../../database";
import { Button } from "@chakra-ui/button";
import { useDispatch } from "react-redux";
import {
  shuttleArcSignupButtonClicked,
  useAuth,
} from "../authentication/authenticationSlice";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";

export const ShuttleArcSignup = () => {

  const [userName, setUserName] = useState("");
  const { name, email, shuttleArcId, status } = useAuth();
  console.log("Log from Shuttlearc signup",name,email)
  const initialRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    initialRef.current.focus();
  }, []);

  const signupUser = async () => {
    const {payload:{success,status,message}} = await dispatch(
      shuttleArcSignupButtonClicked({ userName, shuttleArcId })
    );
    toast({
      title: `${
        success ? "Account created" : "Something is wrong!"
      }`,
      description: `${message}`,
      status: `${status}`,
      duration: 2000,
      isClosable: true,
    });
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} boxShadow="2xl">
        <Box textAlign="center">
          <Heading>Enter your ShuttleArc credentials</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input isDisabled type="text" value={name} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input isDisabled type="email" value={email} />
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
            isLoading={status === "loading"}
            isDisabled={!userName}
            onClick={signupUser}
            borderRadius="3rem"
            bgColor={colors.orange[600]}
            _hover={{ bgColor: colors.orange[700] }}
            width="full"
            mt={4}
            
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
