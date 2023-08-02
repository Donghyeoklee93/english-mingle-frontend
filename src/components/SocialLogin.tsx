import { FaComment, FaGithub, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
        Log in with a different account:
      </Text>

      <HStack pt={"2"}>
        <Button w="100%" leftIcon={<FaGithub />} colorScheme={"telegram"}>
          Github
        </Button>

        <Button w="100%" leftIcon={<RiKakaoTalkFill />} colorScheme={"yellow"}>
          KakaoTalk
        </Button>

        <Button w="100%" leftIcon={<FaWhatsapp />} colorScheme={"whatsapp"}>
          WhatsApp
        </Button>
      </HStack>

      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
    </Box>
  );
}
