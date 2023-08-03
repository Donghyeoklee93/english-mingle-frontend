import { FaSun, FaWaze, FaMoon, FaArrowAltCircleDown } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdBuild, MdCall } from "react-icons/md";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  // const imagePath = "/path/to/your/image.png";
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    // mutation.mutate();
    // const response = await logOut();
    const toastId = toast({
      title: "Login out...",
      description: "Sad to see you go...",
      status: "loading",
      duration: 10000,
      position: "bottom-right",
    });
    await logOut();
    queryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      status: "success",
      title: "Done!",
      description: "See you later!",
    });
  };

  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <FaWaze size={"48"} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaArrowAltCircleDown />}>
            Languages
          </MenuButton>
          <MenuList>
            <MenuItem>English</MenuItem>
            <MenuItem>Korean</MenuItem>
            <MenuItem>Franch</MenuItem>
            <MenuItem>Spanish</MenuItem>
            <MenuItem>Japanese</MenuItem>
          </MenuList>
        </Menu>

        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <Button onClick={onSignUpOpen}>Sign up</Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                {/* my info menu */}
                <MenuItem>My Info</MenuItem>
                {user?.is_host ? (
                  //online class upload menu
                  <Link to="/onlines/upload">
                    <MenuItem>Upload online class</MenuItem>
                  </Link>
                ) : null}
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}

        <Button rightIcon={<MdCall />} colorScheme="blue" variant="outline">
          Call us
        </Button>

        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
