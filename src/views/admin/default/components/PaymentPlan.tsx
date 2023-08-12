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
import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import RadioCard from "components/Radio";
import { PhoneIcon } from "@chakra-ui/icons";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaDollarSign, FaEuroSign } from "react-icons/fa";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAllSurveysContext } from "contexts/SurveyContext";
import { useCurrentUser } from "contexts/UserContext";
import axiosConfig from "axiosConfig";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CompletePayment from "pages/admin/completePayment";
import { useSurveyHistoryContext } from "contexts/SurveyHistoryContext";

// Assets
// import { MultiSelect } from "chakra-multiselect";
interface survey {
  id: number;
  name: string;
  code: string;
  code_value: string;
}

interface Props {
  plan?: any;
  getPlan?: any;
  changeStep?: any;
  handleUpgrade?: any;
  [x: string]: any;
}

export default function PaymentPlan(props: Props) {
  const { plan, getplan, changeStep, handleUpgrade, ...rest } = props;

  type subscriptionData = {
    [key: string]: any; //  variable key
  };

  // Chakra Color Mode

  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const textColordark = useColorModeValue("black", "white");

  const radioOptions = ["USD", "EUR"];

  // component variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [total, setTotal] = useState(0);
  const { surveys, getAllSurveys } = useAllSurveysContext();
  const { updateSurveyOrder } = useSurveyHistoryContext();

  // subscription variables
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customerLivemode] = useState(true);
  const [trialPeriodDays] = useState(0);
  const [cancelAtPeriodEnd] = useState(true);
  const [description, setDescription] = useState("");
  const [collectionMethod] = useState("send_invoice");
  const [cancelAt, setCancelAt] = useState<Date>();
  const [daysUntilDue] = useState<number>(3);
  const [currency, setCurrency] = useState<string>("usd");
  const [planID, setPlanID] = useState<number>(0);
  const [value, setValue] = useState<number[]>([]);
  // const [surveys, setSurveys] = useState([]);
  const { currentUser, fetchCurrentUser } = useCurrentUser();

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
    // phone_number: Yup.number().required("Required"),
    coupon: Yup.string(),
  });

  // update user with phone number
  const updateUser = async (number: string, token: string, id: number) => {
    let data = {
      phone_number: number,
    };

    try {
      await axiosConfig.patch(`/auth/users/me/`, data);
    } catch (err) {
      return;
    }
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

    setError("");
    setLoading(true);

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
      days_until_due: daysUntilDue,
      currency: currency,
      plan_id: planID,
      assigned_surveys: value,
      coupon_code: values.coupon,
    };

    if (values.coupon == "") {
      delete subscription_data["coupon_code"];
    }

    // console.log(subscription_data);
    // setLoading(false);

    await axiosConfig
      .post(`/api/plans/create-subscription`, subscription_data)
      .then((res) => {
        setLoading(false);
        toast({
          position: "bottom-right",
          description: res?.data?.message,
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        router.push("/admin/default").then(() => router.reload());

        // router.replace("/admin/completePayment");
        updateSurveyOrder(res);
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
      // phone_number: phone,
      coupon: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!surveys) {
      getAllSurveys();
    }
  }, [surveys, getAllSurveys]);

  useEffect(() => {
    let cancelDate = getCancelDate(30);
    if (!currentUser) {
      fetchCurrentUser();
    }
    setCustomerName(currentUser.name);
    setCustomerEmail(currentUser.email);
    setPhone(currentUser?.user_profile?.phone_number);
    setCancelAt(cancelDate);
    setTotal(plan?.price);
    setPlanID(plan.id);
  }, [plan, fetchCurrentUser, currentUser]);

  return (
    <Card
      justifyContent="center"
      flexDirection="column"
      w="100%"
      py="10"
      mb="20"
      mt="5"
      borderRadius="10"
      fontFamily="inter"
      {...rest}
    >
      <form onSubmit={handleSubmit}>
        <Flex gap="5">
          <Flex flexDirection="column" flex="1" w="70%">
            <Text
              w="100%"
              textAlign="left"
              fontWeight="600"
              pb="10px"
              fontSize="lg"
              color={textColordark}
            >
              License Subscription
            </Text>
            <Text
              w="100%"
              textAlign="left"
              fontWeight="600"
              py="15px"
              fontSize="16px"
              color={textColordark}
            >
              User Details
            </Text>
            <FormControl pb="10px">
              <FormLabel fontSize="16px" color={textColorSecondary}>
                Name
              </FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                variant="rounded"
                required
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <Flex w="100%" pb="10px">
              <FormControl mr="4">
                <FormLabel fontSize="16px" color={textColorSecondary}>
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="rounded"
                  placeholder=""
                  isDisabled
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <FormHelperText color="red.400" mt="0" mb="5px">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="16px" color={textColorSecondary}>
                  Phone Number *
                </FormLabel>
                <PhoneInput
                  placeholder="Phone Number"
                  international
                  value={phone}
                  onChange={setPhone}
                  inputComponent={Input}
                  style={{
                    borderRadius: "15px",
                    padding: "4px",
                    fontSize: "14px",
                    width: "100%",
                  }}
                />
                {!phone && (
                  <FormHelperText display="flex" color="red.400" mt="0">
                    <Text>
                      <>required</>
                    </Text>
                  </FormHelperText>
                )}
              </FormControl>
            </Flex>

            <Text
              w="100%"
              textAlign="left"
              fontWeight="600"
              py="15px"
              fontSize="sm"
              color={textColordark}
            >
              Plan Details
            </Text>

            <FormControl py="2" mb="2">
              <FormLabel fontSize="16px" color={textColorSecondary}>
                Select Survey(s). max {plan.max_products}
              </FormLabel>
              <Stack spacing={5} direction="row">
                {surveys &&
                  surveys.map((survey: survey) => {
                    return (
                      <Checkbox
                        key={survey.id}
                        colorScheme="primary"
                        value={survey.id}
                        onChange={handleCheckedState}
                        isDisabled={
                          !isChecked(survey.id) &&
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

            <FormControl>
              <FormLabel fontSize="16px" color={textColorSecondary}>
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
              />
              {errors.coupon && touched.coupon && (
                <FormHelperText color="red.400" mt="0" mb="5px">
                  {errors.coupon}
                </FormHelperText>
              )}
            </FormControl>

            <HStack my="3">
              <FormControl w="20%">
                <FormLabel fontSize="16px" color={textColorSecondary}>
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
                <FormLabel fontSize="16px" color={textColorSecondary}>
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
                    data-cy="plan-price"
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
              <Text mb="2">Total: $ {formatPrice(plan.price)}</Text>
              <Text mb="5">
                You will have {daysUntilDue} days of free trial{" "}
              </Text>
              <Button
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
                Place Order
              </Button>
            </Box>
            <Flex w="100%">
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
