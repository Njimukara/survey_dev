// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { Image } from "components/image/Image";
// Assets
import { MdEdit } from "react-icons/md";

export default function User(props: {
  name: string;
  // priveledge?: string;
  [x: string]: any;
}) {
  const { name, priveledge, link, image, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  // const textColorSecondary = 'gray.400'
  // const brandColor = useColorModeValue('brand.500', 'white')
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p="14px">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            {name}
          </Text>
          <Text
            color={textColorPrimary}
            fontWeight="400"
            fontSize="md"
            mb="4px"
          >
            {/* {priveledge} */}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
