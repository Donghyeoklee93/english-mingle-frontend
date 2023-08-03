import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaBed, FaMoneyBill, FaToilet, FaUsb } from "react-icons/fa";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  getSubjects,
  getLevels,
  IUploadOnlineVariables,
  uploadOnline,
} from "../api";
import { ILevel, IOnlineDetail, ISubject } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// interface IForm {
//   name: string;
//   price: number;
//   description: string;
//   kind: string;
//   subjects: number[];
//   level: number;
// }

export default function UploadOnline() {
  const { register, handleSubmit } = useForm<IUploadOnlineVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadOnline, {
    onSuccess: (data: IOnlineDetail) => {
      toast({
        status: "success",
        title: "Room created",
        position: "bottom-right",
      });
      navigate(`/onlines/${data.id}`);
    },
  });
  const { data: subjects, isLoading: subjectsLoading } = useQuery<ISubject[]>(
    ["subjects"],
    getSubjects
  );
  const { data: levels, isLoading: levelsLoading } = useQuery<ILevel[]>(
    ["levels"],
    getLevels
  );
  useHostOnlyPage();
  const onSubmit = (data: IUploadOnlineVariables) => {
    mutation.mutate(data);
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
          <Heading textAlign={"center"}>Class Name</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Class Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write the name of your class .</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>

            <FormControl>
              <FormLabel>Class Time</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="Choose a minites"
              >
                <option value="20MINS">20MINS</option>
                <option value="40MINS">40MINS</option>
                <option value="60MINS">60MINS</option>
              </Select>
              <FormHelperText>
                How long do you want to have class?
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Level</FormLabel>
              <Select
                {...register("level", { required: true })}
                placeholder="Choose a level"
              >
                {levels?.map((level) => (
                  <option key={level.pk} value={level.pk}>
                    {level.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>What level is your class?</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {subjects?.map((subject) => (
                  <Box key={subject.pk}>
                    <Checkbox
                      value={subject.pk}
                      {...register("subjects", { required: true })}
                    >
                      {subject.name}
                    </Checkbox>
                    <FormHelperText>{subject.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? (
              <Text color="red.500">Something went wrong</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"twitter"}
              size="lg"
              w="100%"
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
function toast(arg0: { status: string; title: string; position: string }) {
  throw new Error("Function not implemented.");
}
