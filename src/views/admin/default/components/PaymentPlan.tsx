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
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
  useToast,
  // VStack,
} from "@chakra-ui/react";

// react select
import countryList from "react-select-country-list";
// import Select from "react-select";

// import CurrencyFormat from "react-currency-format";

// Custom components
import Card from "components/card/Card";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  // MdBarChart,
  // MdOutlineCalendarToday,
  MdOutlineCreditCard,
} from "react-icons/md";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
// Assets
// import { RiArrowUpSFill } from "react-icons/ri";
// import {
//   lineChartDataTotalSpent,
//   lineChartOptionsTotalSpent,
// } from "variables/charts";

export default function PaymentPlan(props: { [x: string]: any }) {
  const { plan, getplan, ...rest } = props;

  // Chakra Color Mode

  // const textColor = useColorModeValue("navy.500", "white");
  // const whiteText = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");
  // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // const iconColor = useColorModeValue("brand.500", "white");
  // const brandColor = useColorModeValue("brand.500", "white");
  // const bgButton = useColorModeValue("primary.500", "blue.300");
  // const bgHover = useColorModeValue(
  //   { bg: "primary.600" },
  //   { bg: "whiteAlpha.50" }
  // );
  // const bgFocus = useColorModeValue(
  //   { bg: "primary.600" },
  //   { bg: "whiteAlpha.100" }
  // );

  //   react-select
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value: any) => {
    setCountry(value);
    // setIso(value.value);
    console.log(country);
  };

  // css styling for react select
  const reactSelectStyles = {
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "transparent",
      borderColor: "grey.200",
      color: "black",
      padding: "6px",
      borderRadius: "15px",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "black" }),
  };

  // component variables
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [cardnumber, setCardnumber] = useState(0);
  const [planName, setPlanName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState(0);
  const [total, setTotal] = useState(0);

  // subscription variables
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [couponCode, setCouponCode] = useState("COUPON123");
  const [customerLivemode, setCustomerLivemode] = useState(true);
  const [trialPeriodDays, setTrialPeriodDays] = useState(7);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(true);
  const [description, setDescription] = useState("");
  const [collectionMethod, setCollectionMethod] = useState("send_invoice");
  const [cancelAt, setCancelAt] = useState<Date>();
  const [daysUntilDue, setDaysUntilDue] = useState<number>(7);
  const [currency, setCurrency] = useState<string>("usd");
  const [planID, setPlanID] = useState<number>();

  // get user session
  var { data: session } = useSession();

  // chakra toast
  const toast = useToast();

  const secondSession = useCallback(async () => {
    await getSession()
      .then((res) => {
        // console.log(res);
        session = res;
        setCustomerName(res?.user?.data?.name);
        setCustomerEmail(res?.user?.data?.email);
      })
      .catch((err) => {});
  }, [session]);

  // get cancellation date
  const getCancelDate = (days: number) => {
    let today = new Date();
    let cancelDate = today.setDate(today.getDate() + days);
    let formatedCancelDate = new Date(cancelDate);
    return formatedCancelDate;
  };

  // subscribe to plan
  const subscribe = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    setDescription(
      `Invoice for ${customerName} subscriping to the ${plan.title}`
    );

    let subscription_data = {
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone_no: customerPhone,
      coupon_code: couponCode,
      customer_livemode: customerLivemode,
      trial_period_days: trialPeriodDays,
      cancel_at_period_end: cancelAtPeriodEnd,
      description: description,
      collection_method: collectionMethod,
      cancel_at: cancelAt,
      days_until_due: daysUntilDue,
      currency: currency,
      plan_id: planID,
    };

    console.log(subscription_data);

    await axios
      .post(
        `https://surveyplanner.pythonanywhere.com/api/plans/create-subscription`,
        subscription_data,
        config
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast({
          position: "bottom-right",
          description: "Plan subscripton successful",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "bottom-right",
          description: "Error subscriping to plan",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    // console.log(plan);
    let cancelDate = getCancelDate(7);
    setCancelAt(cancelDate);
    secondSession();
    setTotal(plan?.price);
    setPlanID(plan.id);
  }, [plan]);

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      py="10"
      mb="20"
      {...rest}
    >
      <Flex gap="5">
        <Flex flexDirection="column" flex="1" w="70%">
          <Text
            w="100%"
            textAlign="left"
            fontWeight="bold"
            py="10px"
            color={textColordark}
          >
            Stripe Payment
          </Text>
          <FormControl pb="10px">
            <FormLabel fontSize="sm" color={textColorSecondary}>
              Name
            </FormLabel>
            {/* <InputGroup size="lg"> */}
            <Input
              type="text"
              variant="rounded"
              // placeholder="123 454 231 123 122"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            {/* <InputRightElement>
                {" "}
                <Icon as={MdOutlineCreditCard} />{" "}
              </InputRightElement> */}
            {/* </InputGroup> */}
          </FormControl>
          <Flex w="100%" pb="10px">
            <FormControl mr="4">
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Email
              </FormLabel>
              <Input
                type="email"
                variant="rounded"
                placeholder=""
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Phone Number
              </FormLabel>
              <Input
                type="text"
                size="sm"
                variant="rounded"
                placeholder=""
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel fontSize="sm" color={textColorSecondary}>
              Select Currency
            </FormLabel>
            <Select
              variant="outline"
              // border={{ border: "0.5px purple" }}
              size="lg"
              borderRadius="2xl"
              fontSize="sm"
              _hover={{ border: "0.5px purple" }}
              _focus={{ border: "0.5px purple" }}
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
            >
              <option value="usd">usd - default</option>
              <option value="eur">eur</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color={textColorSecondary}>
              Total
            </FormLabel>
            <Input
              type="number"
              isDisabled
              variant="rounded"
              placeholder="$23232"
              value={total}
              onChange={(e) => setTotal(parseFloat(e.target.value))}
            />
          </FormControl>
        </Flex>

        <Flex
          flexDirection="column"
          w={{ base: "280px", md: "280px", xl: "280px" }}
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
            <Text mb="5">Total: $ {plan.price}</Text>
            <Text wordBreak="break-word">
              You'll have a 7 day free trial before completing your payment
            </Text>
            <Button
              onClick={subscribe}
              isLoading={loading}
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

PaymentPlan.requireAuth = true;
