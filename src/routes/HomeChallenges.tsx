import { Grid } from "@chakra-ui/react";
import Challenge from "../components/Challenge";
import ChallengeSkeleton from "../components/ChallengeSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getChallenges } from "../api";
import { IChallenge } from "../types";

export default function HomeChallenges() {
  const { isLoading, data } = useQuery<IChallenge[]>(
    ["challenges"],
    getChallenges
  );
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
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
          <ChallengeSkeleton />
        </>
      ) : null}
      {data?.map((challenge) => (
        <Challenge
          key={challenge.pk}
          pk={challenge.pk}
          isOwner={challenge.is_owner}
          imageUrl={challenge.photos[0]?.file}
          name={challenge.name}
          rating={challenge.rating}
          description={challenge.description}
          price={challenge.price}
          start={challenge.start}
          end={challenge.end}
        />
      ))}
    </Grid>
  );
}
