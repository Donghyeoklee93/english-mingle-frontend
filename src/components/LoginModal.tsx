import {
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Welcome back to ENGLE MINGLE!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SocialLogin />

          <Text
            textTransform={"uppercase"}
            color="gray.500"
            fontSize="xs"
            as="b"
          >
            Sign in with your username:
          </Text>
          <VStack pt={"2"}>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Password" />
            </InputGroup>
          </VStack>

          <VStack pt={"5"}>
            <Divider />
            <Text
              textTransform={"uppercase"}
              color="red.500"
              fontSize="xs"
              decoration="underline"
              as="b"
            >
              <a href="">Did you forget your password?</a>
            </Text>
            <Divider />

            <Text
              pt={"5"}
              textTransform={"uppercase"}
              color="gray.500"
              fontSize="xs"
              as="b"
            >
              By logging in to your account, you agree to the Terms of Use and
              Privacy Policy.
            </Text>
          </VStack>

          <Button mt={4} colorScheme={"red"} w="100%">
            Log in
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
