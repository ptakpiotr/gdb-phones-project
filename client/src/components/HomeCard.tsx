import { Box, Card, CardBody, CardFooter, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IProps {
  url: string;
  image: string;
  name: string;
}

function HomeCard({ url, image, name }: IProps) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(url);
  };
  return (
    <Box display="flex" flex={1} onClick={onClick} cursor="pointer">
      <Card>
        <CardBody>
          <Image src={image} height="50vh" />
        </CardBody>
        <CardFooter>{name}</CardFooter>
      </Card>
    </Box>
  );
}

export default HomeCard;
