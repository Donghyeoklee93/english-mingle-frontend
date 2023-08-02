import { FaSun, FaWaze, FaMoon, FaArrowAltCircleDown } from "react-icons/fa";
import {
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
} from "@chakra-ui/react";
import { MdBuild, MdCall } from "react-icons/md";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const imagePath = "/path/to/your/image.png";

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

        <Button onClick={onLoginOpen}>Log in</Button>
        <Button onClick={onSignUpOpen}>Sign up</Button>

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
