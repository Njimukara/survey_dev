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
  Square,
  Icon,
  Circle,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

// import { HiUserPlus } from "react-icons/hi2";
// import { ImKey } from "react-icons/im";
// import { BsCalculator } from "react-icons/bs";
// import Card from './Card'

type WorkCardProps = {
  img?: React.ElementType;
  title?: string;
  description?: string;
  iconColor?: string;
};

export const WorkCard = (props: WorkCardProps) => {
  return (
    <Card
      transition="all .2s ease-in-out"
      borderRadius={15}
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <Flex px="25px" py="15px" justifyContent="left" alignItems="flex-start">
        <Box>
          <Flex py="20px">
            {/* <Image
              borderRadius="full"
              boxSize="50px"
              src=""
              alt={props.title}
            /> */}
            <Circle
              size={70}
              boxShadow="2xl"
              // bg={props.iconColor}
              bg="purple"
              // borderRadius="10px"
              mb="8px"
            >
              <Icon as={props.img} w={10} h={10} color="white" />
            </Circle>
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
              fontSize={{ base: "13px", md: "15px", lg: "15px" }}
            >
              {props.description}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};
