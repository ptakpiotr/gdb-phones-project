import { Alert, AlertIcon } from "@chakra-ui/react";

export function NoData() {
  return (
    <Alert status="info">
      <AlertIcon />
      No data
    </Alert>
  );
}
