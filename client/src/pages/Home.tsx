import { Box } from "@chakra-ui/react";
import HomeCard from "../components/HomeCard";

function Home() {
  return (
    <Box display="flex" flexDirection="row">
      <HomeCard
        url="/phones"
        name="Phones"
        image="https://images.unsplash.com/photo-1609500537901-91f5b4c900e6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <HomeCard
        url="/people"
        name="People"
        image="https://images.unsplash.com/photo-1639503611585-1054af5dbfab?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </Box>
  );
}

export default Home;
