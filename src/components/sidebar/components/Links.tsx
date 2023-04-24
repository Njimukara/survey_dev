/* eslint-disable */

// chakra imports
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IRoute } from "types/navigation";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useSubscription } from "contexts/SubscriptionContext";
import axios from "axios";

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  // const { subscription, fetchSubscription } = useSubscription();
  const [subscriptions, setSubscriptions] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  var { data: session, status } = useSession();

  const { routes } = props;

  //   Chakra color mode
  const router = useRouter();

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };

  // console.log(session);

  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName);
  };

  // const subscripedSurveys = (routeID: number) => {
  //   console.log(subscriptions?.assigned_surveys?.includes(routeID));
  // };

  const fetchSubscription = async () => {
    const config = {
      headers: {
        "Content-Type": "json",
        Accept: "application/json;charset=UTF-8",
        Authorization: `Token ${session?.user?.auth_token}`,
      },
    };

    await axios
      .get(
        "https://surveyplanner.pythonanywhere.com/api/plans/subscription/",
        config
      )
      .then((response) => {
        setSubscriptions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setSubscriptions([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubscription();
    // setSubscriptions(subscription);
  }, []);

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, index: number) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return route.subRoutes ? (
          <Box key={index}>
            <HStack
              spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
              py="5px"
              ps="10px"
            >
              <Flex w="100%" alignItems="center" justifyContent="space">
                <Flex w="100%" alignItems="center" justifyContent="space">
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me="18px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box>
                  <Button
                    bg="none"
                    _hover={{ bg: "none" }}
                    onClick={toggleShow}
                  >
                    {show ? <MdArrowDropUp /> : <MdArrowDropDown />}
                  </Button>
                </Box>
              </Flex>
              <Box
                h="36px"
                w="4px"
                bg={
                  activeRoute(route.path.toLowerCase())
                    ? brandColor
                    : "transparent"
                }
                borderRadius="5px"
              />
            </HStack>
            {route.subRoutes ? (
              <Collapse in={show} animateOpacity>
                <Box>
                  {route.subRoutes.map(
                    (
                      routes: { id: number; path: string; name: any },
                      index: number
                    ) => (
                      <Flex key={index}>
                        {/* {subscriptions[
                          subscriptions.length - 1
                        ]?.assigned_surveys?.includes(routes.id) ? ( */}
                        <Link key={index} href={route.layout + routes.path}>
                          <a style={{ width: "100%" }}>
                            <Box w="100%">
                              <HStack
                                spacing={
                                  activeRoute(routes.path.toLowerCase())
                                    ? "22px"
                                    : "26px"
                                }
                                py="5px"
                                ps="10px"
                              >
                                <Text
                                  me="auto"
                                  w="100%"
                                  ml="3em"
                                  color={
                                    activeRoute(routes.path.toLowerCase())
                                      ? activeColor
                                      : inactiveColor
                                  }
                                  fontWeight={
                                    activeRoute(routes.path.toLowerCase())
                                      ? "bold"
                                      : "normal"
                                  }
                                >
                                  {routes.name}
                                </Text>
                                <Box
                                  h="36px"
                                  w="4px"
                                  bg={
                                    activeRoute(routes.path.toLowerCase())
                                      ? brandColor
                                      : "transparent"
                                  }
                                  borderRadius="5px"
                                />
                              </HStack>
                            </Box>
                          </a>
                        </Link>
                        {/* // ) : (
                        //   ""
                        // )} */}
                      </Flex>
                    )
                  )}
                </Box>
              </Collapse>
            ) : (
              ""
            )}
          </Box>
        ) : (
          <Link key={index} href={route.layout + route.path}>
            <a>
              {route.icon ? (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeIcon
                            : textColor
                        }
                        me="18px"
                      >
                        {route.icon}
                      </Box>
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : textColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase())
                            ? "bold"
                            : "normal"
                        }
                      >
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h="36px"
                      w="4px"
                      bg={
                        activeRoute(route.path.toLowerCase())
                          ? brandColor
                          : "transparent"
                      }
                      borderRadius="5px"
                    />
                  </HStack>
                  {route.subRoutes ? (
                    <Box>
                      {route.subRoutes.map(
                        (
                          routes: { id: number; name: string },
                          index: number
                        ) => (
                          <Flex key={index}>{routes.name}</Flex>
                        )
                      )}
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              ) : (
                <Box>
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    ps="10px"
                  >
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                    <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                  </HStack>
                </Box>
              )}
            </a>
          </Link>
        );
      }
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
