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
import { Phone } from "../../../common/validation";

type Props = Phone;

function PhoneCard({ id, make, model, image }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/phone/${id}`);
  };

  return (
    <Box flex="1" padding="0.25rem" margin="0.1rem">
      <Card maxWidth="15rem" display="flex" alignItems="center">
        <CardBody>
          <Image src={image} alt={`${id}`} maxWidth="10rem" />
          <Text textAlign="center">
            {make} {model}
          </Text>
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
