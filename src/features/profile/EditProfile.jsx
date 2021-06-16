import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Flex, Textarea } from "@chakra-ui/react";
import { useEffect } from "react";
import { colors } from "../../database";
import { useDispatch } from "react-redux";
import {
  useAuth,
  saveButtonClicked,
} from "../authentication/authenticationSlice";
import { editProfileClicked } from "./profileSlice";
import { useState } from "react";

export const EditProfile = () => {
  const {status, token, name, userName, bio } = useAuth();
  const [newName, setNewName] = useState(name);
  const [newUserName, setNewUserName] = useState(userName);
  const [newBio, setNewBio] = useState(bio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(editProfileClicked());
    }
  }, [token, dispatch]);

  return (
    <Box maxWidth="50vw" m="auto">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
        />
      </FormControl>
      <FormControl mt={6}>
        <FormLabel>Username</FormLabel>
        <Input
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          type="text"
        />
      </FormControl>
      <FormControl mt={6}>
        <FormLabel>Bio</FormLabel>
        <Textarea
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          type="text"
          placeholder={newBio || "Add your Bio here"}
        />
      </FormControl>
      <Flex>
        <Button
          onClick={() => {
            setNewName(name);
            setNewUserName(userName);
            setNewBio(bio);
          }}
          borderRadius="3rem"
          _hover={{ bgColor: colors.grey[400] }}
          width="full"
          mt={4}
        >
          Discard
        </Button>
        <Button
        isLoading={status==="loading"}
          onClick={() =>
            dispatch(saveButtonClicked({ newName, newUserName, newBio }))
          }
          borderRadius="3rem"
          bgColor={colors.orange[600]}
          _hover={{ bgColor: colors.orange[700] }}
          width="full"
          mt={4}
          type="submit"
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};
