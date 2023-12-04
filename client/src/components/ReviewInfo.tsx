import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Review } from "../../../common/Types";
import { Phone } from "../../../common/validation";
import Rating from "./Rating";
import { NoData } from "./NoData";

interface IProps {
  reviews: Review[];
  phones: Phone[];
  onClick: (ph: Phone) => void;
}

function ReviewInfo({ reviews, phones, onClick }: IProps) {
  if (reviews.length === 0) {
    return <NoData />;
  }

  return reviews.map((r, i) => (
    <Tooltip label={`Buy ${phones[i].make} ${phones[i].model}`}>
      <Card
        flex={1}
        minWidth="200px"
        margin="0.5rem"
        padding="0.5rem"
        onClick={() => {
          onClick(phones[i]);
        }}
        cursor={"pointer"}
      >
        <CardHeader>Buy a phone</CardHeader>
        <CardBody display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <Box flex="1">
              <Text>{r.description}</Text>
            </Box>
            <Box>
              <Box>
                <Image
                  src={phones[i].image}
                  borderRadius="50%"
                  maxWidth="100px"
                  aspectRatio={1}
                  objectFit="cover"
                />
              </Box>
              <Box>
                <Text>
                  {phones[i].make} {phones[i].model}
                </Text>
              </Box>
            </Box>
          </Box>
          <Rating rating={r.rating} />
        </CardBody>
      </Card>
    </Tooltip>
  ));
}

export default ReviewInfo;
