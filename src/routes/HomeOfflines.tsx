import { Grid } from "@chakra-ui/react";
import Offline from "../components/Offline";
import OfflineSkeleton from "../components/OfflineSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getOfflines } from "../api";
import { IOffline } from "../types";

export default function HomeOfflines() {
  const { isLoading, data } = useQuery<IOffline[]>(["offlines"], getOfflines);
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
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
          <OfflineSkeleton />
        </>
      ) : null}
      {data?.map((offline) => (
        <Offline
          key={offline.pk}
          pk={offline.pk}
          isOwner={offline.is_owner}
          imageUrl={offline.photos[0]?.file}
          name={offline.name}
          rating={offline.rating}
          description={offline.description}
          price={offline.price}
        />
      ))}
    </Grid>
  );
}
