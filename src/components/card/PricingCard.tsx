import {
  Heading,
  Text,
  Box,
  Flex,
  List,
  ListItem,
  Button,
  Center,
  ListIcon,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import Card from "./Card";
type ArrayObject = {
  name?: String;
};

type PricingProps = {
  title?: String;
  price?: Number;
  period?: String;
  description?: String;
  advantages?: Array<ArrayObject>;
};

export const PricingCard = (props: PricingProps) => {
  return (
    <Card
      transition="all .2s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Flex>
        <Box>
          <Box ml="10px">
            <Text mb="25px" fontSize="16px" fontWeight="600">
              {props.title}
            </Text>
            <Heading mb="20px" fontSize="16px">
              <Text display="inline-block" fontSize="64px">
                ${props.price?.toString()}
              </Text>
              / {props.period}
            </Heading>
            <Text mb="15px" fontWeight="400">
              {props.description}
            </Text>
            <Box>
              <List spacing={2}>
                {props.advantages?.map((x) => (
                  <ListItem key={""}>
                    <ListIcon
                      key={""}
                      as={MdCheckCircle}
                      color="primary.500"
                      fontSize="18px"
                    />
                    {x.name}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Center>
            <Button variant="outline" mb="20px" mt="30px">
              Get Licence
            </Button>
          </Center>
        </Box>
      </Flex>
    </Card>
  );
};
