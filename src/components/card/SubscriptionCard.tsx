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
  id?: number;
  name?: String;
  description?: string;
};

type SubscriptionProps = {
  id?: number;
  title?: String;
  price?: Number;
  period?: String;
  description?: String;
  advantages?: Array<ArrayObject>;
  max_products: Number;
  getplan?: any;
  changeStep: (newStep: number) => void;
};

export const SubscriptionCard = (props: SubscriptionProps) => {
  return (
    <Card
      transition="all .2s ease-in-out"
      width="100%"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Flex width="100%">
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
            <Text mb="15px" fontSize="sm" px-3 fontWeight="400">
              {props.description}
            </Text>
            <Box>
              <List spacing={2}>
                {props.advantages?.map((x) => (
                  <ListItem key={x.id} fontSize="sm">
                    <ListIcon
                      key={x.id}
                      as={MdCheckCircle}
                      color="primary.500"
                      fontSize="18px"
                    />
                    {x.description}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Center>
            <Button
              onClick={() => {
                props.getplan(props);
                props.changeStep(2);
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
