import { FaRegHeart, FaStar, FaCamera } from "react-icons/fa";
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
import { Link, useNavigate } from "react-router-dom";

interface IOfflineProps {
  imageUrl: string;
  name: string;
  rating: number;
  description: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Offline({
  pk,
  imageUrl,
  name,
  rating,
  description,
  price,
  isOwner,
}: IOfflineProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/offlines/${pk}/photos`);
  };

  return (
    <Link to={`/offlines/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box position="relative" overflow={"hidden"} mb={3} rounded="2xl">
          <Image minH="280" src={imageUrl} />
          <Button
            variant={"unstyled"}
            position="absolute"
            top={0}
            right={0}
            onClick={onCameraClick}
            color="white"
          >
            {isOwner ? <FaCamera size="20px" /> : <FaRegHeart size="20px" />}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack spacing={1} justifyContent="flex-end">
              <Text fontSize={"sm"}>${price}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} noOfLines={2} color="gray">
            {description}
          </Text>
        </Box>
      </VStack>
    </Link>
  );
}
