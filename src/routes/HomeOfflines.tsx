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
          imageUrl={
            offline.photos[0]?.file ||
            "https://media.istockphoto.com/id/1357055615/ko/%EC%82%AC%EC%A7%84/%EB%82%98%EB%AC%B4-%EC%B1%85%EC%83%81%EC%97%90-%EB%8A%90%EB%82%8C%ED%91%9C%EA%B0%80-%EC%9E%88%EB%8A%94-%EA%B5%AC%EA%B2%A8%EC%A7%84-%EC%A2%85%EC%9D%B4-%EA%B3%B5%EA%B3%BC-%EB%A9%94%EB%AA%A8%EC%9E%A5-%ED%8C%8C%EB%9E%80%EC%83%89-%EB%B2%BD-%EB%B0%B0%EA%B2%BD-%EC%82%AC%EA%B3%A0-%EC%86%94%EB%A3%A8%EC%85%98-%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4-%EA%B0%9C%EB%85%90.jpg?b=1&s=612x612&w=0&k=20&c=ApNhN6eODwrw0dPb9_Xkohn3u6iCqnBTT8jLi6XgFS8="
          }
          name={offline.name}
          rating={offline.rating}
          description={offline.description}
          price={offline.price}
        />
      ))}
    </Grid>
  );
}
