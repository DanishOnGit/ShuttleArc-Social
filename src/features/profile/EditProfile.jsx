import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box,Heading } from "@chakra-ui/layout";
import { colors } from "../../database";

export  const EditProfile=()=>{
    return(
        <Box>
            <form>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" value="current name autofilled"/>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Username</FormLabel>
              <Input type="text" value="current username autofilled" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Bio</FormLabel>
              <Input type="text" value="current bio autofilled" />
            </FormControl>
            <Button
            borderRadius="3rem"
              bgColor={colors.orange[600]}
              _hover={{ bgColor: colors.orange[700] }}
              width="full"
              mt={4}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Box>
    )
}