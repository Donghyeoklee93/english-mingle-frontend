import { FaComment, FaGithub, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "dc77a1dbd289f87021480ef058501e87",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();
  console.log(params);

  return (
    <Box mb={4}>
      <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
        Log in with a different account:
      </Text>

      <HStack pt={"2"}>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=442fd1bf01c98732b9ae&scope=read:user,user:email"
          w="100%"
          leftIcon={<FaGithub />}
          colorScheme={"telegram"}
        >
          Github
        </Button>

        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w="100%"
          leftIcon={<RiKakaoTalkFill />}
          colorScheme={"yellow"}
        >
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
