import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { colors } from "../../database";
import { API_URL } from "../utils";

export const Login = () => {
  const [userEmail,setUserEmail] = useState("")
  const [userPassword,setUserPassword] = useState("");

  const loginUser=async ()=>{
    try{
        const response = await axios({
          method:"POST",
          url:`${API_URL}//users-social/shuttlearc-signup-authentication`,
          headers:{email:userEmail,password:userPassword}
        });
        console.log(response)

    }catch(error){
      console.log(error)
    }
  }
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={5} boxShadow="2xl">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} type="email" placeholder="test@test.com" focusBorderColor={colors.orange[500]} />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input value={userPassword}onChange={(e)=>setUserPassword(e.target.value)} type="password" placeholder="*******" focusBorderColor={colors.orange[500]} />
            </FormControl>
            <Button
            onClick={loginUser}
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
        
        <Text>Don't have an account? <Text color={colors.orange[700]} as="span"><Link to="/signup">Signup</Link></Text></Text>
      </Box>
    </Flex>
  );
};
