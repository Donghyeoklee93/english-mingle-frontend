import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL } from "../api";

interface IForm {
  uploadURL: string;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadOfflinePhotos() {
  const { register, handleSubmit } = useForm<IForm>();
  const mutation = useMutation(getUploadURL, {
    onSuccess: (data: any) => {
      console.log(data);
    },
  });

  const { offlinePk } = useParams();
  useHostOnlyPage();
  const onSubmit = (data: any) => {
    // console.log(data);
    mutation.mutate();
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Photo URL</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              <FormLabel>Photo URL</FormLabel>
              <Textarea {...register("uploadURL", { required: true })} />
            </FormControl>

            <Button type="submit" w="50%" colorScheme={"twitter"}>
              Upload photo
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
