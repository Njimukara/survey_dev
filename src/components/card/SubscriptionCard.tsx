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

type SubscriptionProps = {
  title?: String;
  price?: Number;
  period?: String;
  description?: String;
  advantages?: Array<ArrayObject>;
  getplan?: any;
};

export const SubscriptionCard = (props: SubscriptionProps) => {
  return (
    <Card
      transition="all .2s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Flex>
        <Box>
          <Box>
            <Text mb="25px" fontSize="16px" fontWeight="600">
              {props.title}
            </Text>
            <Heading mb="20px" fontSize="16px">
              <Text display="inline-block" fontSize="44px">
                ${props.price?.toString()}
              </Text>
              / {props.period}
            </Heading>
            <Text mb="15px" fontSize="sm" fontWeight="400">
              {props.description}
            </Text>
            <Box>
              <List spacing={2}>
                {props.advantages?.map((x) => (
                  <ListItem key={""} fontSize="sm">
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
            <Button
              onClick={() => {
                props.getplan(props);
              }}
              variant="outline"
              bg="white"
              px="7"
              py="6"
              mb="20px"
              mt="30px"
            >
              Get Licence
            </Button>
          </Center>
        </Box>
      </Flex>
    </Card>
  );
};
