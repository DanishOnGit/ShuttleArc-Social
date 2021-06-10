import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  Avatar,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../database";
import { useAuth } from "../authentication/authenticationSlice";
import { createPost } from "./postSlice";

export const ComposePost = () => {
  const [postContent, setPostContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const dispatch = useDispatch();
  const{name,userName,userId} = useAuth();

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={colors.orange[600]}
        _hover={{ bgColor: colors.orange[700] }}
        borderRadius="3rem"
        pl="3rem"
        pr="3rem"
      >
        Serve
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box mb="3rem">
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <Flex>
              <Avatar
                mr="0.5rem"
                name="Oshigaki Kisame"
                src="https://bit.ly/broken-link"
              />
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                ref={initialRef}
                focusBorderColor={colors.orange[500]}
                placeholder="Share your thoughts..."
              ></Textarea>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => dispatch(createPost({postContent,userId}))}
              isDisabled={!postContent ? true : false}
              bgColor={colors.orange[600]}
              _hover={{ bgColor: colors.orange[700] }}
              color="whiteAlpha.900"
              borderRadius="3rem"
              pl="3rem"
              pr="3rem"
            >
              Serve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
