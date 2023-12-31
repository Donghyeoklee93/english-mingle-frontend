import {
  Box,
  Button,
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
  Select,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { FaUserNinja, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ISignUpError, ISignUpSuccess, ISignUpVariables, SignUp } from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ISignUpForm {
  name: string;
  email: string;
  username: string;
  password: string;
  password2: string;
  extraError?: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ISignUpForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<ISignUpSuccess, ISignUpError, ISignUpVariables>(
    SignUp,
    {
      onSuccess: () => {
        toast({
          title: "Welcome!",
          status: "success",
          position: "top",
        });
        onClose();
        queryClient.refetchQueries(["me"]);
        reset();
      },
      onError: (error) => {
        toast({
          title: error.response.data.error,
          status: "error",
          position: "top",
          isClosable: true,
          duration: 7000,
          variant: "subtle",
        });
      },
    }
  );
  const onSubmit = ({
    name,
    email,
    username,
    password,
    password2,
  }: ISignUpForm) => {
    if (password2 !== password) {
      setError("password2", { message: "Passwords are not the same" });
      return;
    }
    mutation.mutate({
      name,
      email,
      username,
      password,
      password2,
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to ENGLE MINGLE!</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <SocialLogin />

          <Text
            textTransform={"uppercase"}
            color="gray.500"
            fontSize="xs"
            as="b"
          >
            Sign up with your username:
          </Text>

          <VStack pt={"2"}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", { required: "Please write a name" })}
                variant={"filled"}
                placeholder="name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", {
                  required: "Please write a email",
                  validate: (value) => {
                    if (!value.includes("@") || !value.includes(".")) {
                      return "Please follow the email format";
                    }
                  },
                })}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
            {errors.email ? (
              <Box w="100%">
                <Text color="red.500">{errors.email.message}</Text>
              </Box>
            ) : null}

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder="username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                variant={"filled"}
                placeholder="Password"
                type={"password"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password2?.message)}
                {...register("password2", {
                  required: "Please write a password confirmation",
                })}
                variant={"filled"}
                placeholder="Password Confirmation"
                type={"password"}
              />
            </InputGroup>
            {errors.password2 ? (
              <Box w="100%">
                <Text color="red.500">{errors.password2.message}</Text>
              </Box>
            ) : null}
          </VStack>
          <Button type="submit" mt={4} colorScheme={"red"} w={"100%"}>
            Create Account
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
