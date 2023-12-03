import { Alert, AlertIcon } from "@chakra-ui/react";

function ErrorData() {
  return (
    <Alert>
      <AlertIcon />
      An error has occured while fetching data
    </Alert>
  );
}

export default ErrorData;
