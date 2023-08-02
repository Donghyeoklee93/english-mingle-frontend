import { FaRegHeart, FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IOnlineProps {
  imageUrl: string;
  name: string;
  rating: number;
  description: string;
  price: number;
  pk: number;
  //   isOwner: boolean;
}

export default function Online({
  pk,
  imageUrl,
  name,
  rating,
  description,
  price,
}: IOnlineProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/onlines/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box position="relative" overflow={"hidden"} mb={3} rounded="2xl">
          <Image minH="280" src={imageUrl} />
          <Button
            variant={"unstyled"}
            position="absolute"
            top={0}
            right={0}
            color="white"
          >
            <FaRegHeart size="20px" />
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack spacing={1} alignItems="center">
              <FaStar size={12} />
              <Text fontSize={"sm"}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {description}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">${price}</Text> / day
        </Text>
      </VStack>
    </Link>
  );
}
