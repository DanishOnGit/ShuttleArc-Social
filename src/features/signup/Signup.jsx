import { Button } from "@chakra-ui/button";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading,Text } from "@chakra-ui/layout";
import { colors } from "../../database";


import { Link } from "react-router-dom";


export const Signup = () => {
  

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} boxShadow="2xl">
        <Box textAlign="center">
          <Heading>Signup</Heading>
        </Box>
        <Box>
          <Text mt="0.5rem">Have a ShuttleArc account?</Text>
          <Link to="/shuttlearc-login"><Button
            
            borderRadius="3rem"
            bgColor={colors.orange[600]}
            _hover={{ bgColor: colors.orange[700] }}
            width="full"
            mt={4}
          >
            Log In with ShuttleArc
          </Button></Link>
        </Box>
        <Text m="0.5rem" color={colors.grey[700]}>--------OR--------</Text>
        <Box my={4} textAlign="left">
          <form>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Dan jacobs" focusBorderColor={colors.orange[500]} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" focusBorderColor={colors.orange[500]} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="danjacobs" focusBorderColor={colors.orange[500]} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" focusBorderColor={colors.orange[500]} />
            </FormControl>
            <Button
              borderRadius="3rem"
              bgColor={colors.orange[600]}
              _hover={{ bgColor: colors.orange[700] }}
              width="full"
              mt={4}
              type="submit"
            >
              Signup
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
