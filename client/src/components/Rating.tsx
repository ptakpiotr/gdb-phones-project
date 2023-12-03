import { Box } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";

interface IProps {
  rating: number;
}

function Rating({ rating }: IProps) {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
      {[...Array(rating)].map((_, i) => {
        return <FiStar key={`star-${i}`} style={{ color: "gold" }} />;
      })}
    </Box>
  );
}

export default Rating;
