import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { checkBooking, getOnline, getOnlineReviews } from "../api";
import { IOnlineDetail, IReview } from "../types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
  background,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../calendar.css";

export default function OnlineDetail() {
  const { onlinePk } = useParams();
  const { isLoading, data } = useQuery<IOnlineDetail>(
    [`onlines`, onlinePk],
    getOnline
  );
  const { data: reviewsData } = useQuery<IReview[]>(
    [`onlines`, onlinePk, `reviews`],
    getOnlineReviews
  );

  const [dates, setDates] = useState<Date[] | undefined>();
  // console.log(checkBookingData, isCheckingBooking);

  const handleDateChange = (value: any) => {
    setDates(value);
  };
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", onlinePk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );

  // useEffect(() => {
  //   if (dates) {
  //     const [firstDate, secondDate] = dates;
  //     const [timeFrom] = firstDate.toJSON().split("T");
  //     const [timeto] = secondDate.toJSON().split("T");
  //     console.log(timeFrom, timeto);
  //   }
  // }, [dates]);

  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
        <Heading>{data?.description}</Heading>
      </Skeleton>

      <HStack width={"50%"} justifyContent={"space-between"} mt={10}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isLoading} height={"30px"}>
            <Heading fontSize={"2xl"}>
              House hosted by {data?.tutor.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={"30px"}>
            <HStack justifyContent={"flex-start"} w="100%">
              <Text>{data?.name}</Text>
              <Text>∙</Text>
              <Text>{data?.kind}</Text>
              <Text>∙</Text>
              <Text>${data?.price} / per day</Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={data?.tutor.name} size={"xl"} src={data?.tutor.avatar} />
      </HStack>

      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="120vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(2, 1fr)"}
      >
        {[0, 1, 2, 3].map((index) => (
          <GridItem overflow={"hidden"} key={index}>
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Box
        bgColor={"purple.50"}
        mt={"50px"}
        height={"100px"}
        width={"100%"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack>
          <Heading>Review</Heading>
          <Heading mb={5} fontSize={"2xl"}>
            <HStack>
              <FaStar /> <Text>{data?.rating}</Text>
              <Text>∙</Text>
              <Text>
                {reviewsData?.length} review
                {reviewsData?.length === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Heading>
        </VStack>
      </Box>

      <Box height={"50vh"} bgColor={"blue.300"}>
        <Grid
          gap={10}
          templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        >
          {reviewsData?.map((review, index) => (
            <VStack alignItems={"center"} key={index}>
              <HStack>
                <Avatar
                  name={review.user.name}
                  src={review.user.avatar}
                  size="xl"
                />
                <VStack spacing={0} alignItems={"flex-start"}>
                  <Heading fontSize={"md"}>{review.user.name}</Heading>
                  <HStack spacing={1}>
                    <FaStar size="12px" />
                    <Text>{review.rating}</Text>
                  </HStack>
                </VStack>
              </HStack>
              <Text fontSize={20}>{review.textArea}</Text>
            </VStack>
          ))}
        </Grid>
      </Box>

      {/* calendar */}
      <Box
        bgColor={"purple.50"}
        mt={"50px"}
        height={"100px"}
        width={"100%"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack>
          <Heading>Booking</Heading>
          <Heading mb={5} fontSize={"2xl"}></Heading>
        </VStack>
      </Box>
      <Box pt={10}>
        <Calendar
          goToRangeStartOnSelect
          onChange={handleDateChange}
          // showDoubleView
          prev2Label={null}
          next2Label={null}
          minDetail="year"
          minDate={new Date()}
          maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
          selectRange
        />
        <Button
          disabled={!checkBookingData?.ok}
          isLoading={isCheckingBooking && dates !== undefined}
          my={5}
          w="100%"
          colorScheme={"red"}
        >
          Make booking
        </Button>
        {!isCheckingBooking && !checkBookingData?.ok ? (
          <Text color="red.500">Can't book on those dates, sorry.</Text>
        ) : null}
      </Box>
    </Box>
  );
}
