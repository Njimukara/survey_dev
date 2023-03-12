// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
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

// import CurrencyFormat from "react-currency-format";

// Custom components
import Card from "components/card/Card";
import LineChart from "components/charts/LineChart";
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

export default function PaymentPlan(props: { [x: string]: any }) {
  const { plan, getplan, ...rest } = props;

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

  const [active, setActive] = useState(true);
  const [country, setCountry] = useState("");
  const [cardnumber, setCardnumber] = useState(0);
  const [planName, setPlanName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (plan == "") {
      setTotal(plan.price);
      setPlanName(plan.title);
    }
    console.log(plan);
  }, []);

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      py="10"
      mb="10"
      {...rest}
    >
      <Flex gap="5">
        <Flex flexDirection="column" flex="1" w="70%">
          <Text
            w="100%"
            textAlign="left"
            fontWeight="bold"
            color={textColordark}
          >
            Stripe Payment
          </Text>
          <FormControl>
            <FormLabel fontSize="sm" color={textColorSecondary}>
              Card number
            </FormLabel>
            <InputGroup size="lg">
              <Input
                type="number"
                variant="rounded"
                placeholder="123 454 231 123 122"
                value={cardnumber}
                onChange={(e) => setCardnumber(parseFloat(e.target.value))}
              />
              <InputRightAddon children={<Icon as={MdOutlineCreditCard} />} />
            </InputGroup>
          </FormControl>
          <Flex w="100%">
            <FormControl mr="4">
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Expiry
              </FormLabel>
              <Input
                type="month"
                variant="rounded"
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                CVC
              </FormLabel>
              <Input
                type="number"
                variant="rounded"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(parseFloat(e.target.value))}
              />
            </FormControl>
          </Flex>
          <FormControl>
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm" color={textColorSecondary}>
              Total
            </FormLabel>
            <Input
              type="number"
              variant="rounded"
              placeholder="$23232"
              value={total}
              onChange={(e) => setTotal(parseFloat(e.target.value))}
            />
          </FormControl>
        </Flex>

        <Flex
          flexDirection="column"
          w="30%"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bgGradient="linear(to-b, primary.500, brand.700)"
            px="5"
            py="3"
            h="max-content"
            color="white"
            borderRadius={10}
          >
            <Heading as="h4" size="lg" py="3">
              Order Summary
            </Heading>
            <Text>Plan: {plan?.title}</Text>
            <Text>Total: {plan.price}</Text>
            <Button
              fontSize="sm"
              variant="homeWhite"
              fontWeight="800"
              color="primary.500"
              w="100%"
              h="30"
              my="24px"
              py="7"
            >
              Make payment
            </Button>
          </Box>
          <Button
            w="85%"
            variant="outline"
            py="7"
            my="3"
            onClick={() => getplan(null)}
          >
            cancel
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
