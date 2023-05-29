// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import LineChart from "components/charts/LineChart";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  MdBarChart,
  MdOutlineCalendarToday,
  MdOutlineCreditCard,
} from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

export default function Company(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("navy.500", "white");
  const whiteText = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("primary.500", "blue.300");
  const bgHover = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "primary.600" },
    { bg: "whiteAlpha.100" }
  );

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      // console.log(i)
      // console.log(createObjectURL)
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      <Flex>
        <VStack flex="1">
          <Text
            w="100%"
            textAlign="left"
            fontWeight="bold"
            color={textColordark}
          >
            Company Details
          </Text>

          <FormControl>
            <FormLabel fontSize="sm" color={textColorSecondary}>
              Company Name
            </FormLabel>
            <Input
              isRequired={true}
              variant="rounded"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              mb="5px"
              type="text"
              placeholder="Company Name"
              fontWeight="400"
              size="md"
            />
          </FormControl>
          <Flex w="100%">
            <FormControl mr="4">
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Country
              </FormLabel>
              <Input
                isRequired={true}
                variant="rounded"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                mb="5px"
                type="text"
                placeholder="United states"
                fontWeight="400"
                size="md"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                City
              </FormLabel>
              <Input
                isRequired={true}
                variant="rounded"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                mb="5px"
                type="text"
                placeholder="Company Name"
                fontWeight="400"
                size="md"
              />
            </FormControl>
          </Flex>
          <Flex alignItems="center" w="100%">
            <Image
              src={createObjectURL == null ? "/profile.png" : createObjectURL}
              borderRadius="10px"
              objectFit="cover"
              width="50px"
              height="50px"
              borderColor="primary.500"
              alt=""
            />
            <Box position="relative" overflow="hidden" my="3">
              <Button ml="10px" cursor="pointer">
                Upload Logo (optional)
              </Button>
              <Input
                onChange={uploadToClient}
                position="absolute"
                left="0"
                opacity="0"
                type="file"
                name="myfile"
              />
            </Box>
          </Flex>
        </VStack>
      </Flex>
    </Card>
  );
}
