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
  IUploadChallengeVariables,
  uploadChallenge,
} from "../api";
import { ILevel, IChallengeDetail, ISubject } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function UploadChallenge() {
  const { register, handleSubmit } = useForm<IUploadChallengeVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadChallenge, {
    onSuccess: (data: IChallengeDetail) => {
      toast({
        status: "success",
        title: "Room created",
        position: "bottom-right",
      });
      navigate(`/challenges/${data.id}`);
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
  const onSubmit = (data: IUploadChallengeVariables) => {
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
          <Heading textAlign={"center"}>New Challege Program</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>New Challenge Program Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>
                Write the name of your challenge program .
              </FormHelperText>
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
              <FormLabel>Challenge Program Kind</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="Choose a kind"
              >
                <option value="LVEC">LVEC</option>
                <option value="UEEC">UEEC</option>
                <option value="EDEC">EDEC</option>
              </Select>
              <FormHelperText>
                What kind of challenge program do you want?
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
              <FormHelperText>
                What level is your challenge program?
              </FormHelperText>
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

            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Textarea {...register("start", { required: true })} />
            </FormControl>

            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Textarea {...register("end", { required: true })} />
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
              Upload Challenge
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
