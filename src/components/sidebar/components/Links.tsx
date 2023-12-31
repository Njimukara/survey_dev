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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { IRoute } from "../../../../types/navigation";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface SidebarLinksProps {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;

  //   Chakra color mode
  const router = useRouter();

  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };

  // console.log(session);

  let activeColor = useColorModeValue("primary.600", "white");
  let activeIcon = useColorModeValue("primary.600", "white");
  let textColor = useColorModeValue("gray.600", "white");
  let brandColor = useColorModeValue("primary.600", "primary.400");

  const activebg = useColorModeValue("#F7F7FC", "primary.900");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: IRoute[]) => {
    if (!Array.isArray(routes)) {
      // Handle the case where routes is not an array
      return null; // or an appropriate fallback
    }
    return routes?.map((route, index: number) => {
      if (route.layout === "/admin" || route.layout === "/auth") {
        return route.subRoutes ? (
          <Box key={index} pl="16px">
            <HStack
              spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
              py="5px"
              // ps="10px"
              my="1"
              bg={
                activeRoute(route.path.toLowerCase()) ? activebg : "transparent"
              }
              color={
                activeRoute(route.path.toLowerCase()) ? activeColor : textColor
              }
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
                    data-cy="sidebar-link"
                    me="auto"
                    onClick={toggleShow}
                    cursor="pointer"
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
                        <Link key={index} href={route.layout + routes.path}>
                          <a style={{ width: "100%" }}>
                            <Box
                              w="100%"
                              bg={
                                activeRoute(route.path.toLowerCase())
                                  ? activebg
                                  : "transparent"
                              }
                            >
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
                                      : textColor
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
                <Box
                  bg={
                    activeRoute(route.path.toLowerCase())
                      ? activebg
                      : "transparent"
                  }
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : textColor
                  }
                  my="1"
                  pl="16px"
                >
                  <HStack
                    spacing={
                      activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                    }
                    py="5px"
                    // ps="10px"
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
                        data-cy="sidebar-links"
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
                      w="6px"
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
                <Box pl="16px">
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
