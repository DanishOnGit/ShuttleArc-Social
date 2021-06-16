import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { colors } from "../../database";
import { useDispatch } from "react-redux";
import { shuttleArcLoginButtonClicked, useAuth } from "../authentication/authenticationSlice";
import { useToast } from "@chakra-ui/react";

export const ShuttleArcLogin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const{status}=useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const initialRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => initialRef.current.focus(), []);

  const verifyShuttleArcCredentials = async () => {
    const {payload:{success,status,message}} = await dispatch(
      shuttleArcLoginButtonClicked({ userEmail, userPassword })
    );
    toast({
      title: `${
        success ? "Credentials verified" : "Please try again"
      }`,
      description: `${message}`,
      status: `${status}`,
      duration: 2000,
      isClosable: true,
    });
    if (success) {
      navigate("/shuttlearc-signup");
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} boxShadow="2xl">
        <Box textAlign="center">
          <Heading>Enter your ShuttleArc credentials</Heading>
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
          isLoading={status==="loading"}
            isDisabled={!userEmail || !userPassword}
            onClick={verifyShuttleArcCredentials}
            borderRadius="3rem"
            bgColor={colors.orange[600]}
            _hover={{ bgColor: colors.orange[700] }}
            width="full"
            mt={4}
          >
            Verify
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
