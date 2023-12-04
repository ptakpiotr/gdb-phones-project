import {
  Box,
  Card,
  CardBody,
  CardHeader,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import {
  SiNeo4J,
  SiNodedotjs,
  SiReact,
  SiTrpc,
  SiTypescript,
} from "react-icons/si";
function About() {
  return (
    <Box>
      <Card>
        <CardHeader>Used technologies:</CardHeader>
        <CardBody>
          <List>
            <ListItem>
              <ListIcon>
                <SiTypescript size={"1rem"} />
              </ListIcon>
              Typescript
            </ListItem>
            <ListItem>
              <ListIcon>
                <SiTrpc size={"1rem"} />
              </ListIcon>
              tRPC
            </ListItem>
            <ListItem>
              <ListIcon>
                <SiNodedotjs size={"1rem"} />
              </ListIcon>
              Node.js
            </ListItem>
            <ListItem>
              <ListIcon>
                <SiNeo4J size={"1rem"} />
              </ListIcon>
              Neo4j
            </ListItem>
            <ListItem>
              <ListIcon>
                <SiReact size={"1rem"} />
              </ListIcon>
              React.js
            </ListItem>
          </List>
        </CardBody>
      </Card>
    </Box>
  );
}

export default About;
