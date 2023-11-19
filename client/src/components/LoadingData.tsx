import { Skeleton, Stack } from "@chakra-ui/react";

function LoadingData() {
  return (
    <Stack>
      <Skeleton height="3rem" />
      <Skeleton height="3rem" />
      <Skeleton height="3rem" />
    </Stack>
  );
}

export default LoadingData;
