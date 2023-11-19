import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import { FiLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IPhoneInfoShort } from "../Types";

type Props = IPhoneInfoShort;

function PhoneCard({ id, description, image }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/phones/${id}`);
  };

  return (
    <Box flex="1" padding="0.25rem" margin="0.1rem">
      <Card maxWidth="15rem" display="flex" alignItems="center">
        <CardBody>
          <Image src={image} alt={description} maxWidth="10rem" />
          <Text textAlign="center">{description}</Text>
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="teal"
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
