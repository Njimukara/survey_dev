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
import { useRouter } from "next/router";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";
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
  const router = useRouter();
  return (
    <Card
      transition="all .2s ease-in-out"
      bg="#F6F8FA"
      // w="384px"
      px="6"
      py="6"
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
                fontSize="24px"
                color="primary.500"
                fontWeight="600"
              >
                {props.title}
              </Text>
              <Heading mb="20px" fontSize="16px">
                <Text display="inline-block" fontSize="62px" fontWeight="600">
                  ${formatPrice(props.price)}
                </Text>
              </Heading>
              <Text
                mb="25px"
                fontWeight="400"
                fontSize="16px"
                textAlign="center"
                lineHeight="24px"
                px="5px"
              >
                {props.description}
              </Text>
            </Flex>
            <Box>
              <List spacing={2}>
                {props.advantages?.map((x) => (
                  <ListItem key={x.id} fontSize="16px" fontWeight="400">
                    <ListIcon
                      key={x.id}
                      as={MdCheckCircleOutline}
                      color="green.400"
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
              fontWeight={"500"}
              fontSize="16px"
              lineHeight="24px"
              h="48px"
              py="0"
              w="full"
              mx="5"
              mb="10px"
              mt="30px"
              onClick={() => router.push("/auth/signin")}
            >
              Get Licence
            </Button>
          </Center>
        </Box>
      </Flex>
    </Card>
  );
};
