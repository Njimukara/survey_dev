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
  Card,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
// import Card from './Card'
type ArrayObject = {
  id?: number;
  name?: String;
  description?: String;
};

type PricingProps = {
  title?: String;
  price?: number;
  period?: String;
  description?: String;
  advantages?: Array<ArrayObject>;
};

export const PricingCard = (props: PricingProps) => {
  const formatPrice = (price: number | any) => {
    return price / 100;
  };
  return (
    <Card
      transition="all .2s ease-in-out"
      bg="#F6F8FA"
      // w="340px"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Flex>
        <Box>
          <Box ml="10px">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems={"center"}
            >
              <Text
                data-cy="pricing-plan-name"
                my="20px"
                fontSize="20px"
                color="primary.500"
                fontWeight="600"
              >
                {props.title}
              </Text>
              <Heading mb="20px" fontSize="16px">
                <Text display="inline-block" fontSize="64px">
                  ${formatPrice(props.price)}
                </Text>
              </Heading>
              <Text mb="15px" fontWeight="400" px="5px">
                {props.description}
              </Text>
            </Flex>
            <Box>
              <List spacing={2}>
                {props.advantages?.map((x) => (
                  <ListItem key={x.id}>
                    <ListIcon
                      key={x.id}
                      as={MdCheckCircle}
                      color="green.500"
                      fontSize="18px"
                    />
                    {x?.description}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Center>
            <Button
              variant="homePrimary"
              py="5"
              w="full"
              mx="5"
              mb="10px"
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
