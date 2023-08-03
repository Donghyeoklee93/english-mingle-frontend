import { Grid } from "@chakra-ui/react";
import Online from "../components/Online";
import OnlineSkeleton from "../components/OnlineSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getOnlines, getOfflines } from "../api";
import { IOnline } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<IOnline[]>(["onlines"], getOnlines);
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
          <OnlineSkeleton />
        </>
      ) : null}
      {data?.map((online) => (
        <Online
          key={online.pk}
          pk={online.pk}
          isOwner={online.is_owner}
          imageUrl={online.photos[0]?.file}
          name={online.name}
          rating={online.rating}
          description={online.description}
          price={online.price}
        />
      ))}
    </Grid>
  );
}
