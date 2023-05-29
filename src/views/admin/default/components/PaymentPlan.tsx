// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useRadioGroup,
  useToast,
  // VStack,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { MdOutlineCreditCard } from "react-icons/md";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import RadioCard from "components/Radio";
import { PhoneIcon } from "@chakra-ui/icons";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaDollarSign, FaEuroSign } from "react-icons/fa";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

// Assets
// import { MultiSelect } from "chakra-multiselect";

export default function PaymentPlan(props: { [x: string]: any }) {
  const { plan, getplan, changeStep, handleUpgrade, ...rest } = props;

  type subscriptionData = {
    [key: string]: any; //  variable key
  };

  // Chakra Color Mode

  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");

  //   react-select
  const options = [
    { label: "product one", value: "product one" },
    { label: "product two", value: "product two" },
    { label: "product three", value: "product three" },
  ];

  const surveys = [
    { value: 1, name: "multibeam survey" },
    { value: 2, name: "Lydar survey" },
    { value: 3, name: "Acoustic survey" },
    { value: 4, name: "Echo survey" },
  ];

  const radioOptions = ["USD", "EUR"];
  // const options = useMemo(() => optionsArray, []);

  // component variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [total, setTotal] = useState(0);

  // var value: any = useMemo(() => handleCheckBox(item), [item]);

  // subscription variables
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [customerLivemode] = useState(true);
  const [trialPeriodDays] = useState(0);
  const [cancelAtPeriodEnd] = useState(true);
  const [description, setDescription] = useState("");
  const [collectionMethod] = useState("send_invoice");
  const [cancelAt, setCancelAt] = useState<Date>();
  const [daysUntilDue] = useState<number>(3);
  const [currency, setCurrency] = useState<string>("usd");
  const [planID, setPlanID] = useState<number>();
  const [value, setValue] = useState<number[]>([]);

  // get user session
  var { data: session } = useSession();
  const router = useRouter();

  // chakra toast
  const toast = useToast();

  const changeRadio = (data: string) => {
    setCurrency(data.toLocaleLowerCase());
  };

  // Return true based on whether item is checked
  const isChecked = (item: number) => value.includes(item);

  const handleCheckedState = (e: any) => {
    var updatedList = [...value];
    if (e.target.checked) {
      updatedList = [...value, parseInt(e.target.value)];
    } else {
      updatedList.splice(value.indexOf(parseInt(e.target.value)), 1);
    }
    setValue(updatedList);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "currency",
    defaultValue: "USD",
    onChange: changeRadio,
  });
  const group = getRootProps();

  const secondSession = useCallback(async () => {
    await getSession()
      .then((res) => {
        session = res;
        setCustomerName(res?.user?.data?.name);
        setCustomerEmail(res?.user?.data?.email);
        setPhone(res?.user?.data?.user_profile?.phone_number);
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

  // format price
  const formatPrice = (price: number) => {
    return price / 100;
  };

  // Yup validation data schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too Short!")
      .max(30, "Name is too Long!")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    phone_number: Yup.number().required("Required"),
    coupon: Yup.string(),
  });

  // update user with phone number
  const updateUser = async (number: string, token: string, id: number) => {
    let data = {
      phone_number: number,
    };

    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${token}`,
      },
    };

    await axios
      .patch(
        `https://surveyplanner.pythonanywhere.com/auth/users/me/`,
        data,
        config
      )
      .then(() => {
        toast({
          position: "bottom-right",
          description: "Phone number saved",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
        // toast({
        //   position: "bottom-right",
        //   description: 'Could not a',
        //   status: "error",
        //   duration: 4000,
        //   isClosable: true,
        // });
        return;
      });
  };

  // subscribe to plan
  const onSubmit = async (values: any, actions: any) => {
    if (value.length < plan.max_products) {
      setError(`Please select up to ${plan.max_products} survey(s)`);
      return;
    } else if (value.length > plan.max_products) {
      setError(`Only a max of ${plan.max_products} survey(s) for this plan `);
      return;
    }

    setError(null);
    setLoading(true);
    const config = {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    if (phone != values.phone_number) {
      await updateUser(
        values.phone_number,
        session?.user?.auth_token,
        session?.user?.data?.id
      );
    }

    setDescription(
      `Subscription for ${customerName} subscriping to the ${plan.title}`
    );

    let subscription_data: subscriptionData = {
      customer_name: values.name,
      customer_email: values.email,
      customer_phone_no: values.phone_number,
      customer_livemode: customerLivemode,
      trial_period_days: trialPeriodDays,
      cancel_at_period_end: cancelAtPeriodEnd,
      description: `Subscription for ${customerName} subscriping to the ${plan.title}`,
      // collection_method: collectionMethod,
      cancel_at: cancelAt,
      // days_until_due: daysUntilDue,
      currency: currency,
      plan_id: planID,
      assigned_surveys: value,
      coupon_code: values.coupon,
    };

    if (values.coupon == "") {
      delete subscription_data["coupon_code"];
    }

    console.log(subscription_data);
    // setLoading(false);

    await axios
      .post(
        `https://surveyplanner.pythonanywhere.com/api/plans/create-subscription`,
        subscription_data,
        config
      )
      .then((res) => {
        setLoading(false);
        toast({
          position: "bottom-right",
          description: res?.data?.message,
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        // router.push("/admin/default");
        router.replace("/admin/default").then(() => router.reload());
      })
      .catch((err) => {
        // console.log(err);
        setServerError(err?.response?.data?.error);
        toast({
          position: "bottom-right",
          description: err?.response?.data?.error,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  // formik initialisation using yup validation schema
  const {
    values,
    isSubmitting,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: customerName,
      email: customerEmail,
      phone_number: phone,
      coupon: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    let cancelDate = getCancelDate(30);
    secondSession();
    setCancelAt(cancelDate);
    setTotal(plan?.price);
    setPlanID(plan.id);
    // console.log(session);
  }, [plan]);

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      py="10"
      mb="20"
      mt="5"
      borderRadius="10"
      {...rest}
    >
      <form onSubmit={handleSubmit}>
        <Flex gap="5">
          <Flex flexDirection="column" flex="1" w="70%">
            <Text
              w="100%"
              textAlign="left"
              fontWeight="bold"
              pb="10px"
              fontSize="lg"
              color={textColordark}
            >
              License Subscription
            </Text>
            <Text
              w="100%"
              textAlign="left"
              fontWeight="bold"
              py="15px"
              fontSize="sm"
              color={textColordark}
            >
              User Details
            </Text>
            <FormControl pb="10px">
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Name
              </FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                variant="rounded"
                required
                // placeholder="123 454 231 123 122"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                // value={customerName}
                // onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.name && touched.name ? (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.name}
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
            <Flex w="100%" pb="10px">
              <FormControl mr="4">
                <FormLabel fontSize="sm" color={textColorSecondary}>
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="rounded"
                  placeholder=""
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={customerEmail}
                  // onChange={(e) => setCustomerEmail(e.target.value)}
                />
                {errors.email && touched.email ? (
                  <FormHelperText color="red.400" mt="0" mb="5px">
                    {errors.email}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" color={textColorSecondary}>
                  Phone Number *
                </FormLabel>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  size="sm"
                  required
                  variant="rounded"
                  placeholder=""
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // value={customerPhone}
                  // onChange={(e) => setCustomerPhone(e.target.value)}
                />
                {errors.phone_number && touched.phone_number ? (
                  <FormHelperText
                    display="flex"
                    color="red.400"
                    mt="0"
                    // mb="5px"
                  >
                    <Text>
                      <>{errors.phone_number}</>
                    </Text>
                    <Text color="gray.400" fontSize="sm" mx="18px" mb="0">
                      Make sure to add country code
                    </Text>
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Flex>

            <Text
              w="100%"
              textAlign="left"
              fontWeight="bold"
              py="15px"
              fontSize="sm"
              color={textColordark}
            >
              Plan Details
            </Text>

            <FormControl py="2" mb="2">
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Select Survey(s). max {plan.max_products}
              </FormLabel>
              <Stack spacing={5} direction="row">
                {surveys.map((survey) => {
                  return (
                    <Checkbox
                      key={survey.value}
                      colorScheme="primary"
                      value={survey.value}
                      onChange={handleCheckedState}
                      isDisabled={
                        !isChecked(survey.value) &&
                        value.length == plan.max_products
                      }
                    >
                      {survey.name}
                    </Checkbox>
                  );
                })}
              </Stack>
              <FormHelperText color="red.400">{error}</FormHelperText>
            </FormControl>

            {/* <FormControl>
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
          </FormControl> */}

            {/* <MultiSelect
            options={options}
            value={value}
            label="Choose an item"
            onChange={setValue}
            bg="red.500"
          /> */}

            {/* <FormControl>
            <FormLabel fontSize="sm" color={textColorSecondary}>
              Select Surveys
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
          </FormControl> */}

            <FormControl>
              <FormLabel fontSize="sm" color={textColorSecondary}>
                Have a coupon code?
              </FormLabel>
              <Input
                id="coupon"
                name="coupon"
                type="text"
                variant="rounded"
                placeholder=""
                value={values.coupon}
                onChange={handleChange}
                onBlur={handleBlur}
                // value={couponCode}
                // onChange={(e) => setCouponCode(e.target.value)}
              />
              {errors.coupon && touched.coupon ? (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.coupon}
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>

            <HStack my="3">
              <FormControl w="20%">
                <FormLabel fontSize="sm" color={textColorSecondary}>
                  Select Currency
                </FormLabel>
                <HStack>
                  {radioOptions.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    );
                  })}
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" color={textColorSecondary}>
                  Total
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon
                      as={currency == "usd" ? FaDollarSign : FaEuroSign}
                      color="gray.300"
                      bg="none"
                      mt="2"
                      boxSize={5}
                    />
                  </InputLeftElement>

                  <Input
                    type="number"
                    isDisabled
                    variant="rounded"
                    placeholder="$23232"
                    value={formatPrice(total)}
                    _disabled={{
                      bg: "gray.100",
                      color: "primary.500",
                      weight: "bold",
                      border: "none",
                    }}
                    onChange={(e) => setTotal(parseFloat(e.target.value))}
                  />
                </InputGroup>
              </FormControl>
            </HStack>
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
              <Text mb="5">Total: $ {formatPrice(plan.price)}</Text>
              {/* <Text wordBreak="break-word">
                You'll have a 7 day free trial before completing your payment
              </Text> */}
              <Button
                // onClick={subscribe}
                type="submit"
                isLoading={loading}
                fontSize="sm"
                variant="homeWhite"
                fontWeight="800"
                color="primary.500"
                w="100%"
                h="30"
                my="24px"
                py="7"
                _focus={{ bg: "white" }}
              >
                Make payment
              </Button>
            </Box>
            <Flex w="100%">
              {/* <Button
              variant="outline"
              py="7"
              my="3"
              onClick={() => {
                changeStep(2);
              }}
            >
              Back
            </Button> */}
              <Button
                variant="outline"
                w="full"
                py="7"
                my="3"
                onClick={() => {
                  getplan(null);
                  changeStep(1);
                  handleUpgrade(false);
                }}
              >
                cancel
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
}

PaymentPlan.requireAuth = true;
