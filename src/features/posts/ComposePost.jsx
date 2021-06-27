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
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { colors } from "../../database";
import { useAuth } from "../authentication/authenticationSlice";
import { postButtonClicked } from "./postSlice";

export const ComposePost = () => {
  const [postContent, setPostContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const dispatch = useDispatch();
  const { name, userId } = useAuth();
  const variant = useBreakpointValue({ base: "Icon", md: "Compose" });

  return (
    <>
      {variant === "Icon" ? (
        <IconButton
          variant="solid"
          onClick={onOpen}
          bgColor="orange.600"
          _hover={{ bgColor: colors.orange[700] }}
          borderRadius={{ base: "50%", md: "3rem" }}
          fontSize="20px"
          p="2rem 1.5rem"
          icon={<i class="fas fa-pen"></i>}
        />
      ) : (
        <Button
          onClick={onOpen}
          bgColor="orange.600"
          _hover={{ bgColor: colors.orange[700] }}
          borderRadius={{ base: "50%", md: "3rem" }}
          pl="3rem"
          pr="3rem"
        >
          {variant}
        </Button>
      )}

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
                name={name}
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
              onClick={() => {
                dispatch(postButtonClicked({ postContent, userId }));
                setPostContent("");
                onClose();
              }}
              isDisabled={!postContent ? true : false}
              bgColor={colors.orange[600]}
              _hover={{ bgColor: colors.orange[700] }}
              color="whiteAlpha.900"
              borderRadius="3rem"
              pl="3rem"
              pr="3rem"
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
