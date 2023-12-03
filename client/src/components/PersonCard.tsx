import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Person } from "../../../common/Types";
import { FiUser } from "react-icons/fi";

type Props = Person;

function PhoneCard({ name, surname }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/person?name=${name}&surname=${surname}`);
  };

  return (
    <Box flex="1" padding="0.25rem" margin="0.1rem">
      <Card
        maxWidth="15rem"
        display="flex"
        alignItems="center"
        background="darkolivegreen"
        color="whitesmoke"
      >
        <CardBody>
          <Box fontSize="48">
            <FiUser />
          </Box>
          <Text textAlign="center">
            {name} {surname}
          </Text>
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="twitter"
            rightIcon={<FiLink />}
            onClick={handleClick}
          >
            Visit
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}

export default PhoneCard;
