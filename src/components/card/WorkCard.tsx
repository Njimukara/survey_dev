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
  Image,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
// import Card from './Card'

type WorkCardProps = {
  img?: string;
  title?: string;
  description?: string;
};

export const WorkCard = (props: WorkCardProps) => {
  return (
    <Card
      transition="all .2s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Flex px="25px" py="15px" justifyContent="left" alignItems="flex-start">
        <Box>
          <Flex py="20px">
            <Image
              borderRadius="full"
              boxSize="50px"
              src=""
              alt={props.title}
            />
          </Flex>
          <Box>
            <Text
              mb="15px"
              fontSize={{ base: "18px", md: "20px", lg: "25px" }}
              fontWeight="600"
            >
              {props.title}
            </Text>
            <Text
              mb="15px"
              fontWeight="400"
              fontSize={{ base: "13px", md: "15px", lg: "20px" }}
            >
              {props.description}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};
